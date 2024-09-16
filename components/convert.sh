#!/bin/bash

# Directory containing the MID files
inputDir="./../../SDA_YIRA_SONGS_APP/assets/instrumental/"
# Create the output directory if it doesn't exist
mkdir -p "$inputDir"

# FluidSynth soundfont (adjust path as needed)
soundFont="/path/to/your/soundfont.sf2"

# Loop through all MID files in the input directory
for file in "$inputDir"/*.mid; do
    # Extract the file name without extension
    fileName=$(basename "$file" .mid)
    # Convert MID to WAV using FluidSynth
    fluidsynth -ni "$soundFont" "$file" -F "$inputDir/$fileName.wav"
    # Convert WAV to M4A using ffmpeg
    ffmpeg -i "$inputDir/$fileName.wav" -c:a aac "$inputDir/$fileName.m4a"
    # Remove the WAV file
    rm "$inputDir/$fileName.wav"
done

# Remove all MID files after conversion
rm "$inputDir"/*.mid

echo "Conversion and cleanup complete!"
