import React, {useState} from 'react';
import styled from "styled-components";
import {MidiTracks} from "./tracks/MidiTracks";

export function App() {

  const [file, setFile] = useState<ArrayBuffer>(new ArrayBuffer(0))

  async function handleFileInput(event: React.FormEvent<HTMLInputElement>) {
    const submittedFile = event.currentTarget.files;

    if (submittedFile) {
      const midiFile = submittedFile[0]
      const fileContent = await midiFile.arrayBuffer()
      setFile(fileContent)
    }
  }

  return (
    <Container>
      <input type={'file'} accept="audio/midi" onInput={event => handleFileInput(event)}/>
      {file.byteLength > 0 && <MidiTracks file={file}/>}
    </Container>
  );
}


const Container = styled.div`
`