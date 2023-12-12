const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

let users = [
    {
        id: 1,
        name: 'Kim',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Joe',
        favoriteMovies: []
    }
]

let movies = [
    {
        'Title':'Honeydew',
        'Description':'Strange cravings and hallucinations befall a young couple after seeking shelter in the home of an aging farmer and her peculiar son.',
        'Genre': {
            'Name':'Horror',
            'Description':'Horror is a film genre seeking to elicit a negative emotional reaction from viewers by playing on the audiences primal fears.'
        },
        'Director': {
            'Name':'Devereux Milburn',
            'Bio':'Devereux is a New York City-based writer, director, and editor. He is the founder of BlindSpot Studios, an independent production company specializing in the production of narrative films, short documentaries, music videos, and promotional pieces. Since graduating from the Film & TV program at NYUs Tisch School of the Arts, Devereux has collaborated with such artists as Lena Dunham, Mary-Louise Parker, Amy Tan, George Saunders, Rodney Crowell, Garland Jeffreys, Rosanne Cash, Betty Who, Niia, Brian Koppelman, and Gary Shteyngart. His first feature film, Honeydew, was accepted to the 2020 Tribeca Film Festival, where he was nominated for best new narrative director. In addition, the film earned official selections by Sitges Film Festival, Rome Film Festival, Frightfest, Cleveland International Film Festival, Calgary Underground, Strasbourg Film Festival, North Bend Film Festival, and Nightstream. The film is now streaming on most online platforms after a successful theatrical run.'
        },
        'ImageURL':''
    },
    {
        'Title':'The Black Phone',
        'Description':'After being abducted by a child killer and locked in a soundproof basement, a 13-year-old boy starts receiving calls on a disconnected phone from the killers previous victims.',
        'Genre': {
            'Name':'Supernatural Horror',
            'Description':'Supernatural horror is a film genre that combines aspects of supernatural film and horror film. Supernatural occurrences in such films often include ghosts and demons, and many supernatural horror films have elements of religion. Common themes in the genre are the afterlife, the Devil, and demonic possession. Not all supernatural horror films focus on religion, and they can have "more vivid and gruesome violence".'
        },
        'Director': {
            'Name':'Scott Derrickson',
            'Bio':'Scott Derrickson (born July 16, 1966) is an American filmmaker. He is best known for his work in the horror genre, directing films such as The Exorcism of Emily Rose (2005), Sinister (2012) and The Black Phone (2022). He is also known for the superhero film Doctor Strange (2016), based on the Marvel Comics character. Scott Derrickson grew up in Denver, Colorado. He graduated from Biola University with a B.A. in Humanities with an emphasis in philosophy and literature and a B.A. in communications with an emphasis in film and a minor in theology.[1]He completed his graduate studies at USC School of Cinema-Television.'
        },
        'ImageURL':''
    },
    {
        'Title':'Get Out',
        'Description':'A young African-American visits his white girlfriends parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
        'Genre': {
            'Name':'Psychological Horror',
            'Description':'Psychological horror is a subgenre of horror and psychological fiction with a particular focus on mental, emotional, and psychological states to frighten, disturb, or unsettle its audience. The subgenre frequently overlaps with the related subgenre of psychological thriller, and often uses mystery elements and characters with unstable, unreliable, or disturbed psychological states to enhance the suspense, horror, drama, tension, and paranoia of the setting and plot and to provide an overall creepy, unpleasant, unsettling, or distressing atmosphere.' + 'Comedy horror, also known as horror comedy, is a literary, television, and film genre that combines elements of comedy and horror fiction. Comedy horror has been described as able to be categorized under three types: "black comedy, parody and spoof."[1] It often crosses over with the black comedy genre. Comedy horror can also parody or subtly spoof horror clichés as its main source of humour or use those elements to take a story in a different direction, for example in The Cabin in the Woods, Trick r Treat, Tucker & Dale vs. Evil, Shaun of the Dead, Beetlejuice, Gremlins, An American Werewolf in London and the Evil Dead franchise.'
        },
        'Genre': {
            'Name':'Comedy Horror',
            'Description':'Comedy horror, also known as horror comedy, is a literary, television, and film genre that combines elements of comedy and horror fiction. Comedy horror has been described as able to be categorized under three types: "black comedy, parody and spoof."[1] It often crosses over with the black comedy genre. Comedy horror can also parody or subtly spoof horror clichés as its main source of humour or use those elements to take a story in a different direction, for example in The Cabin in the Woods, Trick r Treat, Tucker & Dale vs. Evil, Shaun of the Dead, Beetlejuice, Gremlins, An American Werewolf in London and the Evil Dead franchise.'
        },
        'Director': {
            'Name':'Jordan Peele',
            'Bio':'Jordan Peele is an Oscar- and Emmy-winning director, writer, actor, producer, and founder of Monkeypaw Productions. Peeles first feature film, "Get Out," was a critically acclaimed blockbuster, recognized with four Academy Award nominations, including Best Picture. The film would earn Peele the Oscar for Best Original Screenplay. His second feature, "Us," broke numerous box-office records, becoming the biggest opening for an R-rated original film in history when released in March of 2019 to widespread critical praise. Peeles third feature, the original horror epic, "Nope," opened in the summer of 2022 to rave reviews, the No. 1 slot at the box office, and once again becoming a widely discussed cultural phenomenon. Five years in the making, Peele produced and co-wrote Henry Selicks stop-motion animated feature, "Wendell & Wild," to which he also lent his voice as one of the title characters. Under the Monkeypaw banner, Peele co-wrote and produced Nia DaCostas "Candyman" which made history as the first film helmed by a Black woman director to open at No. 1 at the box office. He also produced Spike Lees "BlacKkKlansman," which earned a nomination for Best Picture and won an Oscar for Best Adapted Screenplay. He has also served as executive producer for numerous television series, including "Hunters" (Amazon), "Lovecraft Country" (HBO), and "The Twilight Zone" (CBS). Prior to becoming a filmmaker, Peele was a celebrated comedian who was the co-star and co-creator of "Key & Peele" on Comedy Central.'
        },
        'ImageURL':''
    },
    {
        'Title':'Meander',
        'Description':'A woman finds herself locked in a series of strange tunnels full of deadly traps.',
        'Genre': {
            'Name':'Science Fiction Horror',
            'Description':'Science fiction horror films are a subgenre of science fiction and horror films, often revolving around subjects that include but are not limited to alien invasions, mad scientists, and/or experiments gone wrong.'
        },
        'Director': {
            'Name':'Mathieu Turi',
            'Bio':'Mathieu Turi is a French director and screenwriter , born January 17 , 1987in Cannes in Provence-Alpes-Côte dAzur. Mathieu Turi entered the Higher School of Audiovisual Production in 2005 to study film production. After studies and award- winning short films such as Sons of Chaos and Broken , Mathieu Turi became assistant director to Quentin Tarantino for his film Inglourious Basterds (2009) and, among others, Guy Ritchie for Sherlock Holmes: A Game of Shadows (2009 ). 2011) or Luc Besson for Lucy (2014). Under the productive eye of Xavier Gens who “found, in the script a profoundly human story, a new look at the genre and a creature never before seen in cinema” , he wrote and shot his first horror feature film in 2016 post-apocalyptic Hostile in English language 3. He subsequently shot Méander , a horror B series with Gaia Weiss. His next feature film, Gueules Noirs , brings together Samuel Le Bihan , Amir El Kacem and Thomas Solivérès 4 .'
        },
        'ImageURL':''
    },
    {
        'Title':'The Platform',
        'Description':'A vertical prison with one cell per level. Two people per cell. Only one food platform and two minutes per day to feed. An endless nightmare trapped in The Hole.',
        'Genre': {
            'Name':'Psychological Horror',
            'Description':'Psychological horror is a subgenre of horror and psychological fiction with a particular focus on mental, emotional, and psychological states to frighten, disturb, or unsettle its audience. The subgenre frequently overlaps with the related subgenre of psychological thriller, and often uses mystery elements and characters with unstable, unreliable, or disturbed psychological states to enhance the suspense, horror, drama, tension, and paranoia of the setting and plot and to provide an overall creepy, unpleasant, unsettling, or distressing atmosphere.'
        },
        'Genre': {
            'Name':'Science Fiction Horror', 
            'Description':'Science fiction horror films are a subgenre of science fiction and horror films, often revolving around subjects that include but are not limited to alien invasions, mad scientists, and/or experiments gone wrong.'
        },
        'Director': {
            'Name':'Galder Gaztelu-Urrutia',
            'Bio':'Galder Gaztelu-Urrutia; born 17 February 1974) is a Spanish film and advertising director and producer.[1] He made his feature-film debut with, The Platform (2019), a dystopian science fiction-horror film. He made a short film, 913 in 2003.[1] He has directed commercials. In 2011, he made The House on the Lake.[1] His feature film debut was in 2019 with the dystopian science fiction-horror film The Platform (its Spanish title is El hoyo). About the film, he said the point is "it isnt about a war between those above and those below — we all have someone above us and someone below us" In February 2023, Deadline announced his next film will be a thriller entitled "Rich Flu", starring Mary Elizabeth Winstead and Jonah Hauer-King.'
        },
        'ImageURL':'https://www.imdb.com/name/nm4417935/mediaviewer/rm774882561/?ref_=nm_ov_ph'
    },
    {
        'Title':'Re-Cycle',
        'Description':'A writer wants to get a glimpse of some genuine supernatural occurrences while doing research for a novel, but her experiences lead her down a dark path as she witnesses vivid hallucinations and begins to lose her grip on reality.',
        'Genre': {
            'Name':'Dark Fantasy',
            'Description':'Dark fantasy is a subgenre of fantasy literary, artistic, and cinematic works that incorporate disturbing and frightening themes of fantasy. It often combines fantasy with elements of horror or has a gloomy dark tone or an atmosphere of horror and dread.'
        },
        'Director': {
            'Name':'Danny Pang' + 'Oxide Chun Pang',
            'Bio':'Danny Pang Phat and Oxide Pang Chun, collectively known as the Pang Brothers, are a filmmaking duo of screenwriters and film directors. The pair are twins, born in Hong Kong in 1965. Among their films is the hit Asian horror film, The Eye, which has spawned two sequels, as well as a Hollywood version also titled The Eye and a Hindi film called Naina. Besides working in Hong Kong, the pair frequently work in the Thai film industry, where they made their directorial debut as a team, Bangkok Dangerous. The Pang brothers grew up at Ka Wai Chuen in Hung Hom when they were young and studied at Kiangsu-Chekiang College (Shatin). The elder brother, Oxide, graduated from New Method College later.'
        },
        'ImageURL':'https://www.imdb.com/name/nm4417935/mediaviewer/rm774882561/?ref_=nm_ov_ph'
    },
    {
        'Title':'Queen of the Damned',
        'Description':'In this loose sequel to Interview with the Vampire: The Vampire Chronicles (1994), the vampire Lestat becomes a rock star whose music wakes up the equally beautiful and monstrous queen of all vampires.',
        'Genre': {
            'Name':'Supernatural Horror',
            'Description':'Supernatural horror is a film genre that combines aspects of supernatural film and horror film. Supernatural occurrences in such films often include ghosts and demons, and many supernatural horror films have elements of religion. Common themes in the genre are the afterlife, the Devil, and demonic possession. Not all supernatural horror films focus on religion, and they can have "more vivid and gruesome violence".'
        },
        'Genre': {
            'Name':'Dark Fantasy',
            'Description':'Dark fantasy is a subgenre of fantasy literary, artistic, and cinematic works that incorporate disturbing and frightening themes of fantasy. It often combines fantasy with elements of horror or has a gloomy dark tone or an atmosphere of horror and dread.'
        },
        'Director': {
            'Name':'Michael Rymer',
            'Bio':'Michael Rymer (born March 1963 in Melbourne) is an Australian television and film director, best known for his work on the re-imagined Battlestar Galactica TV series, for which he directed the pilot miniseries and several episodes of the series. He also directed In Too Deep and Queen of the Damned. Rymer attended film school at the University of Southern California.'
        },
        'ImageURL':''
    },
    {
        'Title':'31',
        'Description':'Five carnival workers are kidnapped and held hostage in an abandoned, hellish compound where they are forced to participate in a violent game, the goal of which is to survive twelve hours against a gang of sadistic clowns.',
        'Genre': {
            'Name':'Slasher',
            'Description':'A slasher film is a subgenre of horror films involving a killer stalking and murdering a group of people, usually by use of bladed or sharp tools such as knives, chainsaws, scalpels, etc. Although the term "slasher" may occasionally be used informally as a generic term for any horror film involving murder, film analysts cite an established set of characteristics which set slasher films apart from other horror subgenres, such as monster movies, splatter films, supernatural and psychological horror films.'
        },
        'Director': {
            'Name':'Rob Zombie',
            'Bio':'Rob Zombie (born Robert Bartleh Cummings; January 12, 1965) is an American singer, songwriter, record producer, filmmaker, and actor. His music and lyrics are notable for their horror and sci-fi themes, and his live shows have been praised for their elaborate shock rock theatricality. He has sold an estimated 15 million albums worldwide. Growing up, he had a fascination with horror films and "always wanted to be Alice Cooper, Steven Spielberg, Bela Lugosi, and Stan Lee".'
        },
        'ImageURL':''
    },
    {
        'Title':'The Lost Boys',
        'Description':'After moving to a new town, two brothers discover that the area is a haven for vampires.',
        'Genre': {
            'Name':'Supernatural Horror',
            'Description':'Supernatural horror is a film genre that combines aspects of supernatural film and horror film. Supernatural occurrences in such films often include ghosts and demons, and many supernatural horror films have elements of religion. Common themes in the genre are the afterlife, the Devil, and demonic possession. Not all supernatural horror films focus on religion, and they can have "more vivid and gruesome violence".'
        },
        'Genre': {
            'Name':'Comedy Horror',
            'Description':'Comedy horror, also known as horror comedy, is a literary, television, and film genre that combines elements of comedy and horror fiction. Comedy horror has been described as able to be categorized under three types: "black comedy, parody and spoof."[1] It often crosses over with the black comedy genre. Comedy horror can also parody or subtly spoof horror clichés as its main source of humour or use those elements to take a story in a different direction, for example in The Cabin in the Woods, Trick r Treat, Tucker & Dale vs. Evil, Shaun of the Dead, Beetlejuice, Gremlins, An American Werewolf in London and the Evil Dead franchise.'
        },
        'Director': {
            'Name':'Joel Schumacher',
            'Bio':'Joel Schumacher was an American film director, film producer, screenwriter and fashion designer from New York City. He rose to fame in the 1980s for directing the coming-of-age drama "St. Elmos Fire" (1985), and the vampire-themed horror film "The Lost Boys" (1987). In the 1990s, he worked on two controversial superhero films "Batman Forever" (1995) and "Batman & Robin" (1997). His final high-profile film was "The Phantom of the Opera" (2004). It was an adaptation of Andrew Lloyd Webbers 1986 musical, rather than the original novel. Towards the end of his career, Schumacher primarily worked on low-profile films with small budgets.'
        },
        'ImageURL':''
    },
    {
        'Title':'The Texas Chainsaw Massacre (2003)',
        'Description':'After picking up a traumatized young hitchhiker, five friends find themselves stalked and hunted by a deformed chainsaw-wielding loon and his family of equally psychopathic killers.',
        'Genre': {
            'Name':'Slasher',
            'Description':'A slasher film is a subgenre of horror films involving a killer stalking and murdering a group of people, usually by use of bladed or sharp tools such as knives, chainsaws, scalpels, etc. Although the term "slasher" may occasionally be used informally as a generic term for any horror film involving murder, film analysts cite an established set of characteristics which set slasher films apart from other horror subgenres, such as monster movies, splatter films, supernatural and psychological horror films.'
        },
        'Director': {
            'Name':'Marcus Nispel',
            'Bio':'Nispel was born on 26 May 1963[1] in Frankfurt. He grew up near McNair Barracks and was able to learn English from hanging out with children of soldiers.[3] At the age of 15, he got a job at a boutique called Hessler and Kehrer. When he had his first interview at an American ad agency, he was asked what do Oreos mean, and he realized the importance of understanding American culture, and how working in advertising helped him understand that. He received a Fulbright Scholarship at the age of 20 and attended Brooklyn College and New York Institute of Technology. He was also an art director for Young & Rubicam. He started a production company, Portfolio Artists Network which later merged with RSA (Ridley Scott Associates) Black Dog Films to form Portfolio/Black Dog. He worked at RSA as a commercial director for several years, resigning in 2000'
        },
        'ImageURL':''
    },
  ];

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public')); //routes all requests for static files to their corresponding files within the 'public' folder on a server

app.use(bodyParser.json());

// CREATE 
app.post('/users', (req, res) => {
    const newUser = req.body; //bodyParser is what allows this to be read

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('users need names')
    }
})

app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    
    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
})

// READ 
app.get('/', (req, res) => {
    res.send('default text response'); //sends a response of various types
});
  
app.get('/movies', (req, res) => {
    res.json(movies); //sends a JSON response
});

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

app.get('/movies/:title', (req, res) => {
    //const title = req.params.title; this is the old way to write this command
    const { title } = req.params; //this is the new way to write this command
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
});

app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }
});

app.get('/movies/director/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }
});

// UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body; //bodyParser is what allows this to be read

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
})

// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    
    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle ); 
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    
    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id ); 
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('no such user')
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  // listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});