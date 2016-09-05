rm -f main.js
find assets/config assets/geography assets/language assets/population assets/science assets/utilities assets/main.js | grep '.js' | while read file; do cat $file >> main.js; done;
http-server -s
