import './App.css';
import { useEffect, useRef } from 'react';
import { Graph, Shape } from '@antv/x6';

import '@antv/x6-react-shape';

import Event from './Graph/Event';
import Canvas from './Graph/Canvas';
import Stencil from './Graph/Stencil';
import Keyboard from './Graph/Keyboard';

function App() {
  const graphRef = useRef();
  const stencilRef = useRef();

  useEffect(() => {
    const graph = Canvas.init(graphRef.current);
    Stencil.init(stencilRef.current, graph);
    Event.init(graph, graphRef);
    Keyboard.init(graph);

    console.log(`Graph`, graph);

    graph.addNode({
      x: 40,
      y: 40,
      shape: 'custom-shape',
      data: {
        type: 'File',
        text: 'passed Text2',
      },
    });

    graph.addNode({
      x: 40,
      y: 40,
      shape: 'custom-shape',
      data: {
        type: 'Job',
        text: 'passed Text1',
      },
    });

    return () => graph.view.restore();
  }, []);

  return (
    <>
      <div className='app'>
        <div className='app-stencil' ref={stencilRef} />
        <div className='app-content' ref={graphRef} />
      </div>
    </>
  );
}

export default App;
