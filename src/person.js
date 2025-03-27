export const person = {
  name: 'John Doe',
  email: 'john.doe.6985@gmail.com',
  phone: '+989698569859',
  address: 'Tehran, Iran',
  educations: [
    {
      id: 0,
      university: 'MIT',
      startDate: new Date(2012, 3, 12),
      endDate: new Date(2015, 11, 2),
      field: 'Computer Science',
      city: 'Massachuset',
    },
    {
      id: 1,
      university: 'Oxford',
      startDate: new Date(2017, 3, 12),
      endDate: null,
      field: 'Quantum mechanics',
      city: 'New York',
    },
  ],

  jobs: [
    {
      id: 0,
      company: 'Apple',
      role: 'CEO',
      startDate: new Date(2010, 1, 2),
      endDate: new Date(2012, 3, 12),
      location: 'New York',
      description:
        'Designed and prototyped user interface patterns for various clients in various industries, ranging from self-service apps within the telecommunications-sector to mobile games for IOS and Android',
    },
    {
      id: 1,
      company: 'Microsoft',
      role: 'Project manager',
      startDate: new Date(2012, 9, 2),
      endDate: new Date(2020, 8, 23),
      location: 'Los angeles',
      description:
        'Designed and prototyped user interface patterns for various clients in various industries, ranging from self-service apps within the telecommunications-sector to mobile games for IOS and Android',
    },
    {
      id: 2,
      company: 'Google',
      role: 'Cook',
      startDate: new Date(2021, 9, 2),
      location: 'Washington D.C.',
      description:
        'Designed and prototyped user interface patterns for various clients in various industries, ranging from self-service apps within the telecommunications-sector to mobile games for IOS and Android',
    },
  ],
};
