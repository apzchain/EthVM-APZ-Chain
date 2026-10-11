export class ProtocolGuide {
  constructor(private config: any) {}

  async generateStepByStepGuide(protocol: string, userLevel: string): Promise<any> {
    const steps = [
      { title: 'Install dependencies', description: `Install ${protocol} packages`, estimatedMinutes: 5 },
      { title: 'Configure network', description: 'Set IP addresses and routing', estimatedMinutes: 10 },
      { title: 'Start service', description: 'Launch the protocol service', estimatedMinutes: 5 }
    ];
    return { protocol, userLevel, steps };
  }
}
