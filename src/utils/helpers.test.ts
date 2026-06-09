import { describe, expect, it } from 'vitest';
import { createObjection } from './helpers';
import { FormId } from '../components/formContent/formContentSlice';
import { ObjectionType } from '../interfaces/objectionInterfaces';
import { TransferData } from '../interfaces/transferInterfaces';
import mockRectificationForm from '../mocks/mockRectificationForm';

const TRANSFER_NUMBER_FROM_PASI = 987654;

describe('createObjection', () => {
  it('strips client-only fields and never sets a delivery decision', () => {
    const result = createObjection(
      mockRectificationForm,
      FormId.PARKINGFINE,
      [],
      undefined
    );

    // fields removed from the payload
    expect(result).not.toHaveProperty('poaFile');
    expect(result).not.toHaveProperty('deliveryDecision');
    // the delivery decision is no longer derived or sent to the backend
    expect(result).not.toHaveProperty('sendDecisionViaEService');
  });

  it('builds a parking-fine objection (foul type, transferNumber dropped)', () => {
    const result = createObjection(
      mockRectificationForm,
      FormId.PARKINGFINE,
      [],
      undefined
    );

    expect(result.type).toBe(ObjectionType.Foul);
    expect(result.transferNumber).toBeUndefined();
    expect(result.email).toBe(mockRectificationForm.email);
    expect(result.attachments).toEqual([]);
    expect(result.authorRole).toBe(Number(mockRectificationForm.authorRole));
    expect(result.metadata).toMatchObject({
      foulNumber: mockRectificationForm.foulNumber,
      registerNumber: mockRectificationForm.registerNumber
    });
  });

  it('uses the PASI transfer number and moved-car metadata for a moved-car objection', () => {
    const movedCarForm = {
      ...mockRectificationForm,
      foulNumber: '',
      transferNumber: '111'
    };
    const formContent = {
      transferNumber: TRANSFER_NUMBER_FROM_PASI
    } as TransferData;

    const result = createObjection(
      movedCarForm,
      FormId.MOVEDCAR,
      [],
      formContent
    );

    expect(result.type).toBe(ObjectionType.Transfer);
    expect(result.foulNumber).toBeUndefined();
    expect(result.transferNumber).toBe(String(TRANSFER_NUMBER_FROM_PASI));
    expect(result.metadata).toMatchObject({
      transferNumber: movedCarForm.transferNumber,
      registerNumber: movedCarForm.registerNumber
    });
  });
});
