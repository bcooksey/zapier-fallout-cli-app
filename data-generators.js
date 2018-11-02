const generateQuests = () => {
  return [
    {
      id: 1,
      title: 'The Power of the Atom',
      description: 'Mr. Burke wants you to denote the bomb in Megaton.',
      locationId: 301,
      conditions: [
        "Speak to Mister Burke in Moriarty's about rigging the atomic bomb to explode",
        'Rig the bomb with a fusion pulse charge',
        'Report to Burke at Tenpenny Tower and activate the detonator'
      ],
      altConditions: [
        'Speak to Lucas Simms about disarming the bomob',
        'Disarm the bomb',
        'Report to Simms that the bomb is disarmed'
      ],
      rewards: [
        {desc: 'Experience', type: 'xp', quantity: 300},
        {desc: 'Caps', type: 'caps', quantity: 500},
        {desc: 'My Tenpenny Tower suite key', type: 'item', quantity: 1}
      ],
      altRewards: [
        {desc: 'Experience', type: 'xp', quantity: 300},
        {desc: 'Caps', type: 'caps', quantity: 500},
        {desc: 'My Megaton House Key', type: 'item', quantity: 1}
      ]
    },
    {
      id: 2,
      title: "Nothin' But a Hound Dog",
      description: 'The King wants you to see if you can heal his dying dog, Rex.',
      locationId: 401,
      conditions: [
        "Talk to The King at the King's School of Impersonation",
        'Talk to Julie Farkas about what can be done to help Rex',
        'Return to the King with the news that Rex can be healed',
        'Take Rex to Doctor Henry in Jacobstown to learn how he can be fixed',
        "Acquire a new brain for Rex from one of Old Lady Gibson's dogs",
        "Return to Jacobstown and have Rey's brain transplanted"
      ],
      rewards: [
        {desc: 'Experience', type: 'xp', quantity: 500},
        {desc: 'Rex as permanent follower', type: 'item', quantity: 1},
      ]
    },
    {
      id: 3,
      title: 'Last Voyage of the U.S.S. Constitution',
      description: 'Ironsides wants you to help him and his robot crew get their ship back to sea',
      locationId: 501,
      conditions: [
        'Meet Lookout',
        'Meet the captain',
        'Repulse the scavenger attack',
        'Install the guidance chip',
        'Recover the FLL3 turbopump bearings',
        'Activate the auxiliary power circuit',
        "Travel to the ship's new location",
        'Talk with Ironsides'
      ],
      rewards: [
        {desc: 'Experience', type: 'xp', quantity: 450},
        {desc: "Lieutenant's hat", type: 'item', quantity: 1}
      ]
    }
  ];
};

const generateLocations = () => {
  return [
    {
      id: 301,
      name: 'Megaton',
      leader: 'Lucas Simms',
      factions: [
        'Church of the Children of Atom'
      ],
      hasMerchants: true
    },
    {
      id: 302,
      name: 'Tenpenny Tower',
      leader: 'Allistair Tenpenny',
      factions: [],
      hasMerchants: true
    },
    {
      id: 401,
      name: 'Freeside',
      leader: 'The King',
      factions: [
       'Followers of the Apocalypse',
        'Kings',
        'Van Graffs',
        'Locals',
        'Squatters'
      ],
      hasMerchants: true
    },
    {
      id: 402,
      name: 'New Vegas Strip',
      leader: 'Mr. House',
      factions: [
        'New California Republic',
        'Omertas',
        'White Glove Society',
        'Chairmen'
      ],
      hasMerchants: true
    },
    {
      id: 501,
      name: 'U.S.S Constitution',
      leader: 'Ironsides',
      factions: [],
      hasMerchants: false
    },
    {
      id: 502,
      name: 'Diamond City',
      leader: 'Mayor McDonough',
      factions: [
        'Diamond City Security' 
      ],
      hasMerchants: true
    },
  ];
};

module.exports = {
  generateQuests,
  generateLocations
};
