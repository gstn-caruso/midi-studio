import React from "react";
import {MidiTrack} from "./MidiTrack";
import {Midi} from "@tonejs/midi";
import * as Tone from 'tone';

export function MidiTracks(props: { file: ArrayBuffer }) {
  const midi = new Midi(props.file)

  const playMidi = async () => {
    Tone.Transport.bpm.value = midi.header.tempos[0].bpm
    const synth = new Tone.PolySynth().toDestination()

    midi.tracks.forEach(track => {
      const myJSON = JSON.stringify(track.notes)
      const parsedArray = JSON.parse(myJSON)
      new Tone.Part((time, value) => {
        synth.triggerAttackRelease(value.name, value.duration, time, value.velocity)
      }, parsedArray).start()

      Tone.Transport.start()
    })
  }

  return <ul>
    <button onClick={playMidi}>Play</button>
    {midi.tracks.map(midiTrack => {
      return <MidiTrack key={`${midiTrack.channel}-${midiTrack.name}`} midiTrack={midiTrack}/>
    })}
  </ul>;
}