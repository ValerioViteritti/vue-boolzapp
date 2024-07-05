const { createApp } = Vue;

createApp({
    data() {
        return {
            // Dati dell'utente corrente
            user: {
                name: 'Valerio',
                image: 'img/download.png'
            },
            // Lista dei contatti
            contacts: [
                {
                    name: 'Goku',
                    lastMessage: 'Ultimo messaggio inviato',
                    lastMessageTime: '10:01',
                    image: 'img/images.png',
                    messages: [
                        { sender: 'contact', content: 'Urca! Gli allenamenti di Re Kaio sono Tosti!', time: '10:01' },
                        { sender: 'user', content: 'Ho visto, diventerai ancora più forte!!!', time: '10:00' }
                    ] 
                }
            ],
            // Lista di nuovi contatti
            newContacts: [
                {
                    name: 'Vegeta',
                    lastMessage: '',
                    lastMessageTime: '',
                    image: 'img/vegeta.png',
                    messages: [
                        { sender: 'user', content: 'Ciao, come stai?', time: '10:00' },
                        { sender: 'contact', content: 'Il Principe dei Sayan sta sempre bene, inutile terrestre!!!', time: '10:01' }
                    ]
                },
                {
                    name: 'Majinbu',
                    lastMessage: '',
                    lastMessageTime: '',
                    image: 'img/majinbu.png',
                    messages: [
                        { sender: 'user', content: 'Quando vuoi dei cioccolatini di ottima qualità fammi sapere :)', time: '10:00' },
                        { sender: 'contact', content: 'Li voglio adesso! Volo da te :P', time: '10:01' }
                    ]
                },
                {
                    name: 'Bulma',
                    lastMessage: '',
                    lastMessageTime: '',
                    image: 'img/bulma.png',
                    messages: [
                        { sender: 'user', content: 'Ciao, come stai?', time: '10:00' },
                        { sender: 'contact', content: 'Sono sposata, non importunarmi!', time: '10:01' }
                    ]
                },
                {
                    name: 'Jiren',
                    lastMessage: '',
                    lastMessageTime: '',
                    image: 'img/jiren.png',
                    messages: [
                        { sender: 'user', content: 'Ciao, come stai?', time: '10:00' },
                        { sender: 'contact', content: 'Bene, grazie! Ma boolzapp funziona anche tra diversi universi? Incredibile!', time: '10:01' }
                    ]
                },
                {
                    name: 'Freezer',
                    lastMessage: '',
                    lastMessageTime: '',
                    image: 'img/freezer.png',
                    messages: [
                        { sender: 'user', content: 'Ma il piano di conquista dello universo come procede?', time: '10:00' },
                        { sender: 'contact', content: 'Che fai prendi in giro? :(', time: '10:01' }
                    ]
                }
            ],
            // Contatto attivo selezionato
            activeContact: null,
            // Nuovo messaggio da inviare
            newMessage: '',
            // Stato della conferma di eliminazione del messaggio
            confirmDeleteIndex: null,
            // Notifiche abilitate/disabilitate
            notificationsEnabled: true,
            // Query di ricerca per filtrare i contatti
            searchQuery: ''
        };
    },
    computed: {
        // Computed property per filtrare i contatti in base alla query di ricerca
        filteredContacts() {
            const query = this.searchQuery.toLowerCase();
            console.log('Filtrando contatti con la query:', query);
            return [
                ...this.contacts.filter(contact => contact.name.toLowerCase().includes(query)),
                ...this.newContacts.filter(contact => contact.name.toLowerCase().includes(query))
            ];
        }
    },
    methods: {
        // Invia un nuovo messaggio se il testo non è vuoto e c'è un contatto attivo
        sendMessage() {
            if (this.newMessage.trim() && this.activeContact) {
                const time = this.getCurrentTime();
                this.activeContact.messages.push({ sender: 'user', content: this.newMessage, time });
                this.activeContact.lastMessage = this.newMessage;
                this.activeContact.lastMessageTime = time;
                console.log('Messaggio inviato:', this.newMessage);
                this.autoReply(); // Risposta automatica
                this.newMessage = '';
            }
        },
        // Conferma l'eliminazione di un messaggio
        confirmDeleteMessage(index) {
            this.activeContact.messages.splice(index, 1);
            console.log('Messaggio eliminato, indice:', index);
        },
        // Risposta automatica dopo 1 secondo
        autoReply() {
            setTimeout(() => {
                if (this.activeContact) {
                    const time = this.getCurrentTime();
                    this.activeContact.messages.push({ sender: 'contact', content: 'Ok', time });
                    this.activeContact.lastMessage = 'Ok';
                    this.activeContact.lastMessageTime = time;
                    console.log('Risposta automatica inviata: Ok');
                }
            }, 1000);
        },
        // Ottieni l'ora corrente in formato HH:MM
        getCurrentTime() {
            const now = new Date();
            const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
            console.log('Ora corrente:', time);
            return time;
        },
        // Cambia il contatto attivo
        switchContact(contact) {
            this.activeContact = contact;
            console.log('Contatto attivo cambiato:', contact.name);
        },
        // Ottieni i messaggi del contatto attivo
        getMessages() {
            if (this.activeContact) {
                console.log('Messaggi del contatto attivo:', this.activeContact.messages);
                return this.activeContact.messages;
            }
            return [];
        },
        // Attiva/Disattiva le notifiche
        toggleNotifications() {
            this.notificationsEnabled = !this.notificationsEnabled;
            console.log('Notifiche abilitate:', this.notificationsEnabled);
        }
    },
    mounted() {
        console.log('App montata');
        console.log('Utente:', this.user);
        console.log('Contatti:', this.contacts);
        console.log('Nuovi contatti:', this.newContacts);
    }
}).mount('#app');
