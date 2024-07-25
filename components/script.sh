#!/bin/bash

# Directory containing MIDI files
INPUT_DIR="./../../SDA_YIRA_SONGS_APP/assets/instrumental/"
OUTPUT_DIR="."

# SoundFont file (you can use a default or custom SoundFont)
SOUNDFONT="/usr/share/sounds/sf2/FluidR3_GM.sf2"

# Create output directory if it does not exist
mkdir -p "$OUTPUT_DIR"

# Iterate over all .mid files in the input directory
for midi_file in "$INPUT_DIR"/*.mid; do
  # Extract the filename without extension
  filename=$(basename "$midi_file" .mid)

  # Convert MIDI to WAV using FluidSynth
  fluidsynth -ni "$SOUNDFONT" "$midi_file" -F "$OUTPUT_DIR/$filename.wav"

  # Convert WAV to MP3 using ffmpeg
  ffmpeg -i "$OUTPUT_DIR/$filename.wav" "$OUTPUT_DIR/$filename.mp3"

  # Remove the intermediate WAV file
  rm "$OUTPUT_DIR/$filename.wav"

  echo "Converted $midi_file to $OUTPUT_DIR/$filename.mp3"
done

echo "All conversions are complete."




 const audioFiles = {
    'number100': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number100.mp3'),
    'number105': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number105.mp3'),
    'number107': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number107.mp3'),
    'number10': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number10.mp3'),
    'number111': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number111.mp3'),
    'number113': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number113.mp3'),
    'number115': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number115.mp3'),
    'number118': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number118.mp3'),
    'number11': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number11.mp3'),
    'number121': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number121.mp3'),
    'number12': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number12.mp3'),
    'number130': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number130.mp3'),
    'number132': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number132.mp3'),
    'number137': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number137.mp3'),
    'number139': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number139.mp3'),
    'number13': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number13.mp3'),
    'number144': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number144.mp3'),
    'number148': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number148.mp3'),
    'number15': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number15.mp3'),
    'number161': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number161.mp3'),
    'number162': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number162.mp3'),
    'number165': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number165.mp3'),
    'number166': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number166.mp3'),
    'number169': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number169.mp3'),
    'number170': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number170.mp3'),
    'number178': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number178.mp3'),
    'number182': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number182.mp3'),
    'number184': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number184.mp3'),
    'number188': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number188.mp3'),
    'number18': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number18.mp3'),
    'number191': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number191.mp3'),
    'number197': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number197.mp3'),
    'number199': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number199.mp3'),
    'number200': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number200.mp3'),
    'number20': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number20.mp3'),
    'number24': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number24.mp3'),
    'number25': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number25.mp3'),
    'number26': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number26.mp3'),
    'number27': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number27.mp3'),
    'number28': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number28.mp3'),
    'number29': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number29.mp3'),
    'number30': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number30.mp3'),
    'number33': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number33.mp3'),
    'number34': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number34.mp3'),
    'number35': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number35.mp3'),
    'number36': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number36.mp3'),
    'number37': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number37.mp3'),
    'number39': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number39.mp3'),
    'number40': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number40.mp3'),
    'number41': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number41.mp3'),
    'number45': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number45.mp3'),
    'number46': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number46.mp3'),
    'number47': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number47.mp3'),
    'number55': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number55.mp3'),
    'number56': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number56.mp3'),
    'number58': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number58.mp3'),
    'number60': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number60.mp3'),
    'number61': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number61.mp3'),
    'number62': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number62.mp3'),
    'number63': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number63.mp3'),
    'number65': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number65.mp3'),
    'number68': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number68.mp3'),
    'number76': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number76.mp3'),
    'number77': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number77.mp3'),
    'number78': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number78.mp3'),
    'number79': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number79.mp3'),
    'number82': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number82.mp3'),
    'number83': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number83.mp3'),
    'number84': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number84.mp3'),
    'number86': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number86.mp3'),
    'number88': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number88.mp3'),
    'number89': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number89.mp3'),
    'number8': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number8.mp3'),
    'number97': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number97.mp3'),
    'number9': require('./../../SDA_YIRA_SONGS_APP/assets/instrumental/number9.mp3'),
  };
