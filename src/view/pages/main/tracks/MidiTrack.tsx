import React from "react";
import {Track} from "@tonejs/midi";

export function MidiTrack(props: { midiTrack: Track }) {
  return <li>{props.midiTrack.name}</li>;
}