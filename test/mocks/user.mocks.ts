export const user = {
  uid: 'testUser',
  userName: 'testUser',
  email: 'testUser',
  firstName: 'testUser',
  lastName: 'testUser',
  userBio: 'testUser',
  gitHubProfile: 'testUser',
  profilePic:
    'https://firebasestorage.googleapis.com/v0/b/helper-duck.appspot.com/o/profilePics%2Fhackercat.jpg?alt=media&token=3cd1ed19-6dd5-47b1-8f19-9da64389cbb8',
  technologies: [
    {
      userId: 1,
      technologyId: 78,
      technology: {
        id: 78,
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
    },
    {
      userId: 1,
      technologyId: 54,
      technology: {
        id: 54,
        name: 'Java',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      },
    },
  ],
  languages: [
    {
      userId: 1,
      languageId: 39,
      language: {
        id: 39,
        code: 'nl',
        name: 'Dutch',
        nativeName: 'Nederlands, Vlaams',
        icon: 'https://countryflagsapi.com/png/nl',
      },
    },
    {
      userId: 1,
      languageId: 40,
      language: {
        id: 40,
        code: 'en',
        name: 'English',
        nativeName: 'English',
        icon: 'https://countryflagsapi.com/png/en',
      },
    },
  ],
};

export const updateTechnology = {
  technologies: [
    {
      technology: {
        name: 'Tailwind CSS',
      },
    },
    {
      technology: {
        name: 'Swift',
      },
    },
    {
      technology: {
        name: 'Java',
      },
    },
  ],
};

export const updateUser = {
  uid: 'test',
  userName: 'testUpdated',
  email: 'testUpdated',
  firstName: 'Siebe',
  lastName: 'Kylstra',
  userBio: 'DevOps nerd updated',
  technologies: [
    {
      technology: {
        name: 'JavaScript',
      },
    },
  ],
};
