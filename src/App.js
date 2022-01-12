import './App.css';
import data from './data';
import { ports } from './utils';
import { useEffect, useRef } from 'react';
import { Graph, Addon, Shape } from '@antv/x6';

import '@antv/x6-react-shape';
import {
  BookOutlined,
  FileTextOutlined,
  SettingOutlined,
  SisternodeOutlined,
} from '@ant-design/icons/lib/icons';

const { Stencil } = Addon;

const Icon = ({ data }) => {
  const colors = {
    Job: 'orange',
    File: 'blue',
    Index: 'green',
    SubProcess: 'red',
  };
  const icons = {
    Job: <SettingOutlined />,
    File: <FileTextOutlined />,
    Index: <BookOutlined />,
    SubProcess: <SisternodeOutlined />,
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#ededed',
        padding: '5px 0',
        borderRadius: 5,
      }}
    >
      <div
        style={{
          padding: '5px',
          background: colors[data.type],
          borderRadius: 5,
          border: `2px solid dark${colors[data.type]}`,
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          color: 'white',
          marginBottom: '10px',
        }}
      >
        {icons[data.type]}
      </div>
      <div style={{ textAlign: 'center' }}>{data.text}</div>
    </div>
  );
};

Graph.registerNode('custom-shape', {
  inherit: 'react-shape',
  width: 110,
  height: 65,
  ports,
  component(node) {
    const data = node.getData();
    return <Icon data={data} />;
  },
});

function App() {
  const graphRef = useRef();
  const stencilRef = useRef();

  useEffect(() => {
    const graph = new Graph({
      container: graphRef.current,
      width: 800,
      height: 600,
      resizing: {
        enabled: true,
        minWidth: 110,
        maxWidth: 200,
        minHeight: 65,
        maxHeight: 65,
        orthogonal: false,
        restricted: false,
        allowReverse: false,
        preserveAspectRatio: false,
      },
      rotating: {
        enabled: true,
      },
      connecting: {
        allowBlank: false,
        allowMulti: true,
        allowLoop: true,
        allowNode: true,
        allowEdge: true,
        allowPort: false,
        highlight: true,
      },
      grid: {
        size: 5, // 网格大小 10px
        visible: true, // 渲染网格背景
      },
      snapline: {
        enabled: true,
        sharp: true,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        });
      },
    });
    console.log(`Graph`, graph);

    const stencil = new Stencil({
      title: 'Assets',
      target: graph,
      layoutOptions: {
        columns: 1,
        columnWidth: 130,
        rowHeight: 75,
      },
      stencilGraphWidth: 150,
      stencilGraphHeight: 500,
      groups: [
        {
          name: 'Assets',
          title: 'Assets',
          collapsable: false,
        },
      ],
    });

    const assetsNames = ['Job', 'File', 'Index', 'SubProcess'];

    const assetsNodes = assetsNames.map(asset => {
      return graph.createNode({
        shape: 'custom-shape',
        data: {
          type: asset,
          text: asset,
        },
      });
    });

    stencil.load(assetsNodes, 'Assets');

    stencilRef.current.appendChild(stencil.container);

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

    graph.on('node:mouseenter', ({ node }) => {
      // Show visible ports
      const ports = graphRef.current.querySelectorAll('.x6-port-body');
      ports.forEach(port => (port.style.visibility = 'visible'));
      // add a remove button
      node.addTools({ name: 'button-remove' });
    });

    graph.on('node:mouseleave', ({ node }) => {
      // hide visible ports
      const ports = graphRef.current.querySelectorAll('.x6-port-body');
      ports.forEach(port => (port.style.visibility = 'hidden'));
      // hide remove button
      node.removeTools();
    });

    graph.on('edge:mouseenter', ({ edge }) => {
      //add a remove button to edge
      edge.addTools({ name: 'button-remove', args: { distance: -40 } });
    });

    graph.on('edge:mouseleave', ({ edge }) => {
      //hide a remove button
      edge.removeTools();
    });

    return () => {
      graph.view.restore();
    };
  }, []);

  return (
    <div className='app'>
      <div className='app-stencil' ref={stencilRef} />
      <div className='app-content' ref={graphRef} />
    </div>
  );
}

export default App;
