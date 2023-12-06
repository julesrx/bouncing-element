#/bin/bash

read -p "Are you sure? y/n" -n 1 -r
echo   
if [[ $REPLY =~ ^[Yy]$ ]]
then
    npm publish --access public
fi