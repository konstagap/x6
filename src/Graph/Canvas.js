import { Graph, Shape } from '@antv/x6';
import './Shape';

export default class Canvas {
  static graph;

  static init(container) {
    const graph = new Graph({
      width: 800,
      height: 600,
      container: container,
      history: true,
      selecting: true,
      grid: {
        size: 5, // 网格大小 10px
        visible: true, // 渲染网格背景
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowMulti: true,
        allowLoop: true,
        allowNode: true,
        allowEdge: true,
        allowPort: false,
        highlight: true,
      },
      snapline: {
        enabled: true,
        sharp: true,
      },
      //   scroller: {
      //     enabled: true,
      //     pageVisible: false,
      //     pageBreak: false,
      //     pannable: true,
      //   },
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
      keyboard: {
        enabled: true,
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

    this.graph = graph;
    return graph;
  }
}
