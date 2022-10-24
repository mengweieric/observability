export interface VisualizationSubject {
  render: () => any;
}

export class Visualization implements VisualizationSubject {
  constructor(
    protected readonly data: any,
    protected readonly metadata: any,
    protected readonly type: string
  ) {}
  
  render() {
    // default rendering
    return {
      x: this.data,
      y: this.metadata,
      agg: this.type
    };
  }
}
