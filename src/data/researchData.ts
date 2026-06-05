export interface ResearchArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string[];
  keywords: string[];
  visualModelType: 'synapse' | 'reflex-arc' | 'brain-regions' | 'plasticity-chart';
  sections: {
    heading: string;
    paragraphs: string[];
    diagramData?: any;
  }[];
}

export const researchArticles: ResearchArticle[] = [
  {
    id: 'nervous-system',
    title: 'The Architecture of the Human Nervous System',
    category: 'Neuroanatomy',
    summary: 'An overview of the Central and Peripheral Nervous Systems, their components, and how neurons carry electronic impulses to maintain homeostasis.',
    keywords: ['CNS', 'PNS', 'Neuron', 'Myelin', 'Axon', 'Glial Cells'],
    visualModelType: 'brain-regions',
    content: [
      'The human nervous system is the ultimate command center, orchestrating every sensation, action, and thought. It is biologically divided into two main branches: the Central Nervous System (CNS) and the Peripheral Nervous System (PNS).',
      'The CNS comprises the brain and spinal cord, acting as the primary processor. The PNS consists of nerves branching off the spinal cord, spreading throughout the body to act as sensory receptors and motor drivers.'
    ],
    sections: [
      {
        heading: 'The Neuron: The Core Processing Unit',
        paragraphs: [
          'Neurons are specialized cells designed to transmit information through electrical and chemical signals. A typical neuron consists of a cell body (soma), dendrites (which receive inputs), and a long axon (which carries electrical impulses away).',
          'Axons are often wrapped in a fatty sheath called myelin, produced by Schwann cells. This myelin sheath acts as an electrical insulator, forcing action potentials to jump between nodes (Nodes of Ranvier), which dramatically speeds up signal transmission (saltatory conduction).'
        ]
      },
      {
        heading: 'Central vs. Peripheral Pathways',
        paragraphs: [
          'Central pathways process cognitive actions, sensory interpretation, and voluntary motion. The brain’s cerebral cortex houses specialized functional lobes: the frontal lobe controls decision-making and motor functions, the occipital lobe processes vision, and the parietal lobe coordinates sensory inputs.',
          'Peripheral pathways consist of the somatic nervous system (controlling voluntary movements via skeletal muscles) and the autonomic nervous system (regulating involuntary visceral functions like heart rate and digestion).'
        ]
      },
      {
        heading: 'Synaptic Transmission',
        paragraphs: [
          'When an electrical impulse (action potential) reaches the axon terminal, it cannot cross the physical gap (synaptic cleft) to the next neuron. It triggers the release of chemical messengers called neurotransmitters from synaptic vesicles.',
          'These neurotransmitters diffuse across the cleft and bind to receptor proteins on the postsynaptic dendrite, triggering a new action potential or inhibitory response. This chemical interface introduces a slight delay (synaptic delay) of 0.5 to 2.0 milliseconds per synapse.'
        ]
      }
    ]
  },
  {
    id: 'reflex-actions',
    title: 'Physiology of Reflex Actions & The Reflex Arc',
    category: 'Neurophysiology',
    summary: 'Delve into involuntary, near-instantaneous movements in response to stimuli, and trace the anatomical pathway of the reflex arc bypassing the conscious brain.',
    keywords: ['Reflex Arc', 'Afferent Nerve', 'Efferent Nerve', 'Interneuron', 'Stimulus'],
    visualModelType: 'reflex-arc',
    content: [
      'A reflex is an involuntary, rapid, and automatic response to a sensory stimulus. Unlike voluntary motions, reflexes bypass conscious brain processing to ensure survival, allowing muscles to contract instantly in response to danger.'
    ],
    sections: [
      {
        heading: 'The Anatomy of a Reflex Arc',
        paragraphs: [
          'A reflex arc is the neural pathway that controls a reflex action. It consists of five primary components:',
          '1. Receptor: Detects the initial stimulus (e.g., extreme heat on the skin).',
          '2. Sensory (Afferent) Neuron: Transmits the electrical signal from the receptor to the spinal cord.',
          '3. Integration Center (Spinal Cord / Interneuron): In a monosynaptic reflex (like the knee-jerk), the sensory neuron synapses directly with a motor neuron. In polysynaptic reflexes (like withdrawing from pain), one or more interneurons connect them.',
          '4. Motor (Efferent) Neuron: Transmits the response command away from the spinal cord.',
          '5. Effector: The target muscle or gland that carries out the contraction or secretion.'
        ]
      },
      {
        heading: 'Why Bypassing the Brain Matters',
        paragraphs: [
          'Processing information in the brain’s cerebral cortex requires millions of synaptic synapses, which takes time (approx. 200-300ms). By completing the entire loop inside the spinal cord (taking only 30-50ms), the body mitigates tissue damage from threats (like fire or sharp objects) before the brain even registers pain.'
        ]
      }
    ]
  },
  {
    id: 'reaction-time',
    title: 'Reaction Time: Biological Baselines and Influencing Factors',
    category: 'Cognitive Science',
    summary: 'Explore the limits of human processing speed, the difference between simple and choice reaction times, and the biological bottlenecks of performance.',
    keywords: ['Reaction Time', 'Synaptic Delay', 'Conduction Velocity', 'Arousal', 'Fatigue'],
    visualModelType: 'brain-regions',
    content: [
      'Reaction time is the interval between the onset of a stimulus and the initiation of a motor response. While reflexes are involuntary and spinal-cord mediated, general reaction times (like pressing a button when a light turns green) involve visual processing, motor planning, and voluntary control.'
    ],
    sections: [
      {
        heading: 'The Three Types of Reaction Tasks',
        paragraphs: [
          '1. Simple Reaction Time: One stimulus, one response. (e.g. Visual Reflex Checker). Typical average is 190–240ms for healthy young adults.',
          '2. Recognition Reaction Time: Targets are presented along with distractors. The user must respond to targets and ignore distractors (e.g. Focus Endurance Test).',
          '3. Choice Reaction Time: Multiple stimuli, each requiring a unique response (e.g. Direction Challenge, Stroop Color Challenge). This requires cognitive decision making and increases latency (typically 350-600ms).'
        ]
      },
      {
        heading: 'Biological Bottlenecks',
        paragraphs: [
          'Human reaction speed is limited by physical constraints: the time it takes photoreceptors to convert light to electric signals (~20-40ms), nerve conduction speed along axons (~50-100 m/s), synaptic transmission delays across synapses (~1-2ms per junction), and muscle activation latency (~10-30ms).'
        ]
      },
      {
        heading: 'Modulating Factors',
        paragraphs: [
          'Reaction time is highly dynamic and modulated by: sleep deprivation (increases fatigue index and delays response), age (gradually slows from late 20s onward), distraction (cognitive load increases processing time), and systematic athletic/neurological training (strengthens neural pathways to decrease motor latency).'
        ]
      }
    ]
  },
  {
    id: 'neuroplasticity',
    title: 'Neuroplasticity: How the Brain Adapts to Training',
    category: 'Learning & Adaptation',
    summary: 'Discover the cellular mechanisms of brain plasticity, how repeated reflex exercises strengthen synaptic efficiency, and the concept of myelination.',
    keywords: ['Neuroplasticity', 'LTP', 'Synaptic Strength', 'Myelination', 'Dendritic Spines'],
    visualModelType: 'plasticity-chart',
    content: [
      'Neuroplasticity is the nervous system’s capacity to reorganize its structure, functions, or connections in response to learning, training, or environmental changes. This cellular adaptation is what allows humans to improve reaction times, focus, and memory through practice.'
    ],
    sections: [
      {
        heading: 'Synaptic Plasticity & Hebbian Learning',
        paragraphs: [
          'The fundamental rule of neuroplasticity is often summarized as: "neurons that fire together, wire together." When two neurons repeatedly communicate, the efficiency of their synaptic junction increases. This process is called Long-Term Potentiation (LTP).',
          'LTP results in more neurotransmitters being released from the presynaptic neuron and more receptors being expressed on the postsynaptic neuron, making future signal transmission faster and more reliable.'
        ]
      },
      {
        heading: 'Myelination and White Matter Adaptation',
        paragraphs: [
          'Repeatedly firing a neural pathway activates oligodendrocytes (glial cells in the CNS) to wrap additional layers of myelin around those active axons. Thicker myelin increases action potential speed by up to 100 times, directly decreasing reaction time and increasing coordination.'
        ]
      },
      {
        heading: 'Training the Focus and Inhibitory Control',
        paragraphs: [
          'Exercises like the Stroop Color Challenge force the prefrontal cortex to exert top-down inhibitory control over automatic impulses. Consistent practice trains the brain to suppress distractors faster, leading to higher focus endurance, lower fatigue indices, and superior cognitive performance.'
        ]
      }
    ]
  }
];
