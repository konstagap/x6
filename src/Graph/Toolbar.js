import React, { useEffect, useState } from 'react';
// import { message } from 'antd';
import Graph from './Canvas';
import { Menu, Toolbar } from '@antv/x6-react-components';
import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import 'antd/dist/antd.css';

import {
  ZoomInOutlined,
  ZoomOutOutlined,
  RedoOutlined,
  UndoOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const Item = Toolbar.Item; // eslint-disable-line
const Group = Toolbar.Group; // eslint-disable-line

const CustomToolbar = () => {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    if (!Graph.graph) return;

    const { graph } = Graph;
    console.log('-graph-----------------------------------------');
    console.dir({ graph }, { depth: null });
    console.log('------------------------------------------');

    // history
    setCanUndo(graph.history.canUndo());
    setCanRedo(graph.history.canRedo());

    graph.history.on('change', () => {
      setCanUndo(graph.history.canUndo());
      setCanRedo(graph.history.canRedo());
    });

    // zoom
    setZoom(graph.zoom());

    graph.on('cell:selected', () => {
      setCanDelete(true);
    });

    graph.on('cell:unselected', () => {
      setCanDelete(false);
    });

    graph.on('scale', () => {
      setZoom(graph.zoom());
    });
  }, [Graph.graph]);

  const handleClick = name => {
    console.log(name);
    const { graph } = Graph;
    switch (name) {
      case 'undo':
        graph.history.undo();
        break;
      case 'redo':
        graph.history.redo();
        break;

      case 'resetView':
        graph.zoomTo(1);
        break;

      default:
        graph.zoomTo(parseInt(name, 10) * 0.01);
        break;
    }
  };

  return (
    <div style={{ padding: 0 }}>
      <div style={{ background: '#f5f5f5', paddingRight: 0 }}>
        <Toolbar
          hoverEffect={true}
          size='big'
          onClick={handleClick}
          extra={<span>Extra Component</span>}
        >
          <Group>
            <Item
              name='zoomIn'
              tooltip='Zoom In (Cmd +)'
              icon={<ZoomInOutlined />}
              disabled={zoom > 2}
            ></Item>
            <Item
              name='zoomOut'
              tooltip='Zoom Out (Cmd -)'
              icon={<ZoomOutOutlined />}
              disabled={zoom < 0.5}
            />
          </Group>
          <Group>
            <Item
              name='undo'
              tooltip='Undo (Cmd + Z)'
              disabled={!canUndo}
              icon={<UndoOutlined />}
            />
            <Item
              name='redo'
              tooltip='Redo (Cmd + Shift + Z)'
              disabled={!canRedo}
              icon={<RedoOutlined />}
            />
          </Group>
          <Group>
            <Item
              name='delete'
              icon={<DeleteOutlined />}
              disabled={!canDelete}
              tooltip='Delete (Delete)'
            />
          </Group>
        </Toolbar>
      </div>
    </div>
  );
};

export default CustomToolbar;
