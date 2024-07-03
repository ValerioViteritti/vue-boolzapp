const { createApp } = Vue;

createApp({
    data() {
        return {
            user: {
                name: 'Valerio', // Nome dell'utente
                image: 'img/download.png' // Immagine dell'utente
            },
            contacts: [
                {
                    name: 'Goku', // Nome del contatto
                    lastMessage: 'Ultimo messaggio inviato', // Ultimo messaggio inviato
                    lastMessageTime: '10:01', // Ora dell'ultimo messaggio inviato
                    image: 'img/images.png', // Immagine del contatto
                    messages: [
                        { sender: 'contact', content: 'Urca! Gli allenamenti di Re Kaio sono Tosti!', time: '10:01' },
                        { sender: 'user', content: 'Ho visto, diventerai ancora più forte!!!', time: '10:00' }
                    ] 
                }
            ],
            newContacts: [
                {
                    name: 'Vegeta', // Nome del nuovo contatto
                    lastMessage: '', // Ultimo messaggio inviato (vuoto per i nuovi contatti)
                    lastMessageTime: '', // Ora dell'ultimo messaggio inviato (vuoto per i nuovi contatti)
                    image: 'img/vegeta.png', // Immagine del nuovo contatto
                    messages: [
                        { sender: 'user', content: 'Ciao, come stai?', time: '10:00' },
                        { sender: 'contact', content: 'Il Principe dei Sayan sta sempre bene, inutile terrestre!!!', time: '10:01' }
                    ] // Lista dei messaggi (vuota per i nuovi contatti)
                },
                {
                    name: 'Majinbu', // Nome del nuovo contatto
                    lastMessage: '', // Ultimo messaggio inviato (vuoto per i nuovi contatti)
                    lastMessageTime: '', // Ora dell'ultimo messaggio inviato (vuoto per i nuovi contatti)
                    image: 'img/majinbu.png', // Immagine del nuovo contatto
                    messages: [
                        { sender: 'user', content: 'Quando vuoi dei cioccolatini di ottima qualità fammi sapere :)', time: '10:00' },
                        { sender: 'contact', content: 'Li voglio adesso! Volo da te :P', time: '10:01' }
                    ] // Lista dei messaggi (vuota per i nuovi contatti)
                },
                {
                    name: 'Bulma', // Nome del nuovo contatto
                    lastMessage: '', // Ultimo messaggio inviato (vuoto per i nuovi contatti)
                    lastMessageTime: '', // Ora dell'ultimo messaggio inviato (vuoto per i nuovi contatti)
                    image: 'img/bulma.png', // Immagine del nuovo contatto
                    messages: [
                        { sender: 'user', content: 'Ciao, come stai?', time: '10:00' },
                        { sender: 'contact', content: 'Sono sposata, non importunarmi!', time: '10:01' }
                    ] // Lista dei messaggi (vuota per i nuovi contatti)
                },
                {
                    name: 'Jiren', // Nome del nuovo contatto
                    lastMessage: '', // Ultimo messaggio inviato (vuoto per i nuovi contatti)
                    lastMessageTime: '', // Ora dell'ultimo messaggio inviato (vuoto per i nuovi contatti)
                    image: 'img/jiren.png', // Immagine del nuovo contatto
                    messages: [
                        { sender: 'user', content: 'Ciao, come stai?', time: '10:00' },
                        { sender: 'contact', content: 'Bene, grazie! Ma boolzapp funziona anche tra diversi universi? Incredibile!', time: '10:01' }
                    ] // Lista dei messaggi (vuota per i nuovi contatti)
                },
                {
                    name: 'Freezer', // Nome del nuovo contatto
                    lastMessage: '', // Ultimo messaggio inviato (vuoto per i nuovi contatti)
                    lastMessageTime: '', // Ora dell'ultimo messaggio inviato (vuoto per i nuovi contatti)
                    image: 'img/freezer.png', // Immagine del nuovo contatto
                    messages: [
                        { sender: 'user', content: 'Ma il piano di conquista dello universo come procede?', time: '10:00' },
                        { sender: 'contact', content: 'Che fai prendi in giro? :(', time: '10:01' }
                    ] // Lista dei messaggi (vuota per i nuovi contatti)
                }
            ],
            activeContact: null, // Contatto attivo selezionato
            newMessage: '', // Nuovo messaggio da inviare
            showDeleteConfirm: false, // Mostra conferma di eliminazione
            confirmDeleteIndex: null, // Indice del messaggio da eliminare
            dropdownIndex: null, // Indice del dropdown mostrato
            dropdownX: 0, // Coordinata X del dropdown
            dropdownY: 0, // Coordinata Y del dropdown
            notificationsEnabled: true, // Notifiche abilitate/disabilitate
            searchQuery: '' // Query di ricerca per filtrare i contatti
        };
    },
    computed: {
        filteredContacts() {
            // Filtra i contatti esistenti e i nuovi contatti in base alla query di ricerca
            const query = this.searchQuery.toLowerCase();
            console.log('Filtrando contatti con la query:', query);
            return [
                ...this.contacts.filter(contact => contact.name.toLowerCase().includes(query)),
                ...this.newContacts.filter(contact => contact.name.toLowerCase().includes(query))
            ];
        }
    },
    methods: {
        sendMessage() {
            // Invia un nuovo messaggio se il testo non è vuoto e c'è un contatto attivo
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
        confirmDeleteMessage(index) {
            // Conferma l'eliminazione di un messaggio
            this.confirmDeleteIndex = index;
            this.showDeleteConfirm = true;
            console.log('Conferma eliminazione messaggio, indice:', index);
        },
        deleteMessage() {
            // Elimina un messaggio
            if (this.activeContact) {
                this.activeContact.messages.splice(this.confirmDeleteIndex, 1);
                console.log('Messaggio eliminato, indice:', this.confirmDeleteIndex);
            }
            this.showDeleteConfirm = false;
            this.confirmDeleteIndex = null;
        },
        cancelDelete() {
            // Annulla l'eliminazione di un messaggio
            this.showDeleteConfirm = false;
            this.confirmDeleteIndex = null;
            console.log('Eliminazione messaggio annullata');
        },
        autoReply() {
            // Risposta automatica dopo 1 secondo
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
        getCurrentTime() {
            // Ottieni l'ora corrente in formato HH:MM
            const now = new Date();
            const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
            console.log('Ora corrente:', time);
            return time;
        },
        switchContact(contact) {
            // Cambia il contatto attivo
            this.activeContact = contact;
            console.log('Contatto attivo cambiato:', contact.name);
        },
        getMessages() {
            // Ottieni i messaggi del contatto attivo
            if (this.activeContact) {
                console.log('Messaggi del contatto attivo:', this.activeContact.messages);
                return this.activeContact.messages;
            }
            return [];
        },
        showDropdown(index, event) {
            // Mostra il menu a tendina
            this.dropdownIndex = index;
            this.dropdownX = event.clientX;
            this.dropdownY = event.clientY;
            console.log('Dropdown mostrato per il messaggio:', index, 'alle coordinate:', this.dropdownX, this.dropdownY);
        },
        toggleNotifications() {
            // Attiva/Disattiva le notifiche
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
