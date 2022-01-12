export default class Event {
  static init(graph, graphRef) {
    graph.on('node:mouseenter', ({ node }) => {
      // Show visible ports
      const ports = graphRef.current.querySelectorAll('.x6-port-body');
      ports.forEach(port => (port.style.visibility = 'visible'));
      // add a remove button
      node.addTools([
        {
          name: 'button-remove',
          args: {
            offset: { x: 20, y: 10 },
          },
        },
        {
          name: 'button',
          args: {
            markup: [
              {
                tagName: 'text',
                textContent: 'Hide',
                selector: 'icon',
                attrs: {
                  fill: '#fe854f',
                  fontSize: 10,
                  textAnchor: 'middle',
                  cursor: 'pointer',
                  fontSize: '13px',
                },
              },
            ],
            x: '100%',
            y: 3,
            offset: { x: -20, y: 10 },
            onClick({ cell }) {
              console.log('hello');
            },
          },
        },
      ]);
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
  }
}
