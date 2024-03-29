#!/bin/bash

set -Eeo pipefail

while getopts g:e: flag
do
    case "${flag}" in
      g) groupID=${OPTARG};;
      e) envFile=${OPTARG};;
      *)
    esac
done

if [ ! "${envFile}" ]
then
  echo -e "You must provide .env file to read from"
  exit 1
fi

if [ ! "${groupID}" ]
then
  echo -e "You must provide Azure variable group ID"
  exit 1
fi

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}
  #Remove quotes around the value to make it easier to use value
  value=${value%\"}
  value=${value#\"}

  az pipelines variable-group variable create --group-id "${groupID}" --name "${varname}" --value "${value}" ||
     az pipelines variable-group variable update --group-id "${groupID}" --name "${varname}" --value "${value}";


done < "${envFile}"
