import { Addon } from '@antv/x6';

export default class Stencil {
  static stencil;

  static init(stencilContainer, graph) {
    this.stencil = new Addon.Stencil({
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

    if (stencilContainer) {
      stencilContainer.appendChild(this.stencil.container);
    }

    this.addShape(graph);
  }

  static addShape(graph) {
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

    this.stencil.load(assetsNodes, 'Assets');
  }
}
