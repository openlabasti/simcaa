import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .init({
        // we init with resources
        resources: {
            it: {
                translations: {
                    // HOMEPAGE
                    "MAIN_LBL_CREATE": "Crea nuovo Progetto",
                    "MAIN_BTN_BASIC": "Progetto base",
                    "MAIN_LBL_ALL": "Tutti i progetti",
                    "MAIN_LBL_MANAGEPJ": "Gestisci i tuoi Progetti", //**
                    "MAIN_LBL_LAST": "Ultimi Progetti modificati",
                    "MAIN_LBL_NEWS": "Ultime News",
                    "MAIN_TBL_NAME": "Nome",
                    "MAIN_TBL_PROFILEOWN": "Proprietario del Profilo",//**
                    "MAIN_TBL_DATEUPDATE": "Ultimo aggiornamento",//**
                    "MAIN_TBL_NOTES": "Note",
                    "MAIN_TBL_SHARE": "Condivisione",
                    "MAIN_TBL_USEROWN": "Proprietario",//**
                    "MAIN_TBL_PUBLIC": "Pubblico",
                    "MAIN_TBL_PRIVATE": "Privato",
                    "MAIN_TBL_ACTIONS": "Azioni",
                    "MAIN_FRM_TITLE": "Titolo del Progetto",
                    "MAIN_FRM_PROFILE": "Profilo del Progetto",
                    "MAIN_FRM_PLACEHOLDER_USER": "Impossile cambiare il profilo adesso",
                    "MAIN_FRM_LAYOUT": "Layout del Progetto",
                    "MAIN_FRM_PLACEHOLDER_LAYOUT": "Impossile cambiare il layout adesso",
                    "MAIN_FRM_SHARE": "Progetto pubblico o privato",
                    "MAIN_FRM_PUBLIC": "Rendi questo Progetto pubblico",
                    "MAIN_FRM_NOTES": "Note del Progetto",
                    "MAIN_BTN_CREATE": "Crea il Progetto",
                    "MAIN_BTN_UPDATE": "Aggiorna il Progetto",
                    "MAIN_BTN_CLOSE": "Annulla",
                    "MAIN_BTN_OR": "o",
                    "MAIN_LBL_ALLPROFILE": "Tutti i Profili",
                    "MAIN_LBL_MANAGEPROFILE": "Gestisci i tuoi Profili",//**
                    "MAIN_LBL_CREATEPROFILE": "Crea nuovo Profilo",
                    "MAIN_LBL_UPDATEPROFILE": "Aggiorna Profilo",
                    "MAIN_FRM_PROFILENAME": "Nome del Profilo",
                    "MAIN_BTN_FORWARD": "Avanti",
                    "MAIN_BTN_BACK": "Indietro",
                    "MAIN_BTN_CREATEPROFILE": "Crea Profilo",
                    "MAIN_BTN_UPDATEPROFILE": "Aggiorna Profilo",

                    // HOMEPAGE NAVBAR
                    "HOME_NAVBAR_LANGUAGE": "Lingua",
                    "HOME_NAVBAR_MANAGE": "Gestione",
                    "HOME_NAVBAR_MANAGE_SYMBOL": "Carica Simbolo",
                    "HOME_NAVBAR_USER": "Utente",
                    "HOME_NAVBAR_USER_PROFILE": "Profilo",
                    "HOME_NAVBAR_USER_LOGOUT": "Esci",

                    // NAVBAR
                    "HEAD_BTN_OPTIONS": "Opzioni",
                    "HEAD_BTN_EXPORT": "Esporta",
                    "HEAD_BTN_SAVE": "Salva",
                    "HEAD_BTN_CLOSE": "Chiudi",
                    "HEAD_BTN_VIEW": "View",
                    "HEAD_BTN_EDIT": "Edit",
                    "HEAD_BTN_TYPO": "typo",

                    // LAYOUT/TYPO
                    "HEAD_BTN_RESET": "Resetta il layout",
                    "HEAD_BTN_EXPORTPDF": "Esporta come PDF",
                    "HEAD_BTN_ADD_IMGS": "Aggiungi immagini personali",
                    "HEAD_BTN_PRINT": "Stampa",
                    "HEAD_BTN_RETURN": "Ritorna al Progetto",
                    "TYPO_FRM_PLACEHOLDER": "Seleziona la dimensione delle immagini",
                    "TYPO_HDR_CUSTOMTITLE": "Inserisci titolo",
                    "TYPO_BTN_CUSTOMTITLE": "Aggiungi titolo",
                    "TYPO_BTN_CUSTOMTEXT": "Aggiungi testo",
                    "TYPO_HDR_CUSTOMTEXT": "Inserisci testo",
                    "TYPO_LBL_TEXT": "Testo",
                    "TYPO_LBL_SIZETEXT": "Dimensioni del testo",
                    "TYPO_LBL_COLORTEXT": "Colore dell'area di testo",
                    "TYPO_LBL_INVERTEDTEXT": "Colore invertito",
                    "TYPO_LBL_PREVIEW": "Anteprima",
                    "TYPO_HDR_DELETECUSTOM": "Cancella elementi aggiuntivi",

                    //MODAL TO UPLOAD IMGS VIA DnD
                    "MODAL_IMGS_DND_HEADER": "Caricamento di immagini personali!",
                    "MODAL_IMGS_DND_HELPER": "Trascina l'immagine nel riquadro per caricarla",
                    "MODAL_IMGS_DND_DROPZONE_HELPER": "Trascina qui l'immagine, oppure clicca il riquadro",
                    "MODAL_IMGS_DND_UPLOADED": "Immagine caricata correttamente!",
                    "MODAL_WARNING_TYPE": "Solo immagini *.jpeg and *.png saranno accettate",
                    "MODAL_IMGS_DND_UPERROR": "Errore nel caricamento dell'ultima immagine, riprova",
                    "MODAL_IMGS_DND_UPLOADED_LIST": "Immagini caricate:",
                    "MODAL_IMGS_DND_UPLOADING": "Sto caricando....",

                    // OPTIONS
                    "OPT_LBL_EDITOPTIONS": "Modifica Impostazioni",
                    "OPT_LBL_TEXTFORMAT": "Formato del Testo",
                    "OPT_LBL_INPUTPOSITION": "Posizione del Testo",
                    "OPT_LBL_INPUTSTYLE": "Stile della casella di testo",
                    "OPT_LBL_SIZEINPUT": "Dimensione della casella di testo",
                    "OPT_LBL_FONTWEIGHTINPUT": "Grassetto",
                    "OPT_LBL_FONTDECORATIONINPUT": "Sottolineato",
                    "OPT_LBL_FONTSTYLEINPUT": "Stile del Testo",
                    "OPT_LBL_TEXTCOLOR": "Colore del Testo",
                    "OPT_LBL_TEXTBKGCOLOR": "Colore della casella di testo",
                    "OPT_LBL_IMAGESIZE": "Dimensione Simbolo",
                    "OPT_LBL_IMAGEPADDING": "Distanza Simbolo dal bordo della Card",
                    "OPT_LBL_IMAGECOLORPREF": "Preferenze sul colore dei Simboli",
                    "OPT_LBL_IMAGETYPEPREF": "Preferenze sul tipo dei Simboli",
                    "OPT_LBL_BORDERCOLOR": "Colore del bordo",
                    "OPT_LBL_BORDERTYPE": "Tipo di bordo",
                    "OPT_LBL_BORDERSIZE": "Dimensione del bordo",
                    "OPT_BTN_CANCELEXIT": "Annulla ed Esci",
                    "OPT_BTN_SAVEEXIT": "Salva ed Esci",
                    "OPT_MNU_INPUTOPTIONS": "Testo",
                    "OPT_MNU_IMAGEOPTIONS": "Simbolo",
                    "OPT_MNU_CARDOPTIONS": "Card",
                    "OPT_MNU_PROFILEOPTIONS": "Profilo",
                    "OPT_MNU_PROJECTOPTIONS": "Progetto",
                    "OPT_FRM_FREE": "Libero",
                    "OPT_FRM_UPPERCASE": "Maiuscolo",
                    "OPT_FRM_LOWERCASE": "Minuscolo",
                    "OPT_FRM_TOP": "Sopra",
                    "OPT_FRM_BOTTOM": "Sotto",
                    "OPT_FRM_NORMAL": "Normale",
                    "OPT_FRM_TRANSPARENT": "Trasparente",
                    "OPT_FRM_MINI": "Miniuscola",
                    "OPT_FRM_TINY": "Piccolina",
                    "OPT_FRM_SMALL": "Piccola",
                    "OPT_FRM_LARGE": "Normale",
                    "OPT_FRM_MEDIUM": "Media",
                    "OPT_FRM_BIG": "Grossa",
                    "OPT_FRM_HUGE": "Enorme",
                    "OPT_FRM_MASSIVE": "Gigantesca",
                    "OPT_FRM_BOLD": "Grassetto",
                    "OPT_FRM_OVERLINE": "Soprallineato",
                    "OPT_FRM_UNDERLINE": "Sottolineato",
                    "OPT_FRM_ITALIC": "Italic",
                    "OPT_FRM_OBLIQUE": "Obliquo",
                    "OPT_FRM_COLOR": "Colori",
                    "OPT_FRM_BLACKANDWHITE" : "Bianco e Nero",
                    "OPT_FRM_DASHED": "Tratteggiato",
                    "OPT_FRM_DOTTED": "Puntinato",
                    "OPT_FRM_DOUBLE": "Doppio",
                    "OPT_FRM_SOLID": "Solido",

                    // PROJECT
                    "PRJ_MNU_BACK": "Torna alla Home",
                    "PRJ_MNU_OPTIONS": "Opzioni",
                    "PRJ_MNU_ADDPROFILE": "Aggiungi Profilo",
                    "PRJ_BTN_EDIT": "Gestisci",
                    "PRJ_BTN_VIEW": "Visualizza",
                    "PRJ_BTN_DELETE": "Elimina",
                    "PRJ_LBL_NEWCHAPT": "Nuovo Capitolo",
                    "PRJ_LBL_INFO": "Clicca sulla icona per creare un nuovo capitolo su questo progetto",
                    "PRJ_FRM_HEADER": "Crea nuovo capitolo",
                    "PRJ_FRM_TITLE": "Titolo del capitolo",
                    "PRJ_FRM_ERROR_HEADER": "Errore",
                    "PRJ_FRM_ERROR_CONTENT": "Il titolo del progetto non può essere lasciato vuoto",
                    "PRJ_FRM_LAYOUT": "Layout del capitolo",
                    "PRJ_BTN_CREATE": "Crea Capitolo",
                    "PRJ_BTN_CLOSE": "Chiudi",

                    //MISC
                    "INTERROR_HEADER": "Si è verificato un errore!",
                    "INTERROR_BODY": "C'è un problema di sistema, riprovare più tardi",
                    "BTN_CONTINUE": "Continua",
                    "BTN_DENY": "Annulla",
                    "BTN_CONFIRM": "Conferma",
                    "BTN_MOD": "Modifica",

                    //ADMINISTRATION

                    //ADMIN-MENU
                    "ADM_MNU_USRS": "Utenti",
                    "ADM_MNU_GROUPS": "Teams",
                    "ADM_MNU_BACK": "Torna ai progetti",

                    //ADMIN-AllUsers
                    "TBL_NAME" : "Nome",
                    "TBL_USR" : "Username",
                    "TBL_EMAIL" : "Email",
                    "TBL_ORG" : "Organizzazione",
                    "TBL_LWEB" : "Sito Web",
                    "TBL_GROUP" : "Ruolo",
                    "TBL_TEAM" : "Team",
                    "TBL_ACTION" : "Azione",
                    "DELETE_CNF_H": "Questa azione è irreversibile!",
                    "DELETE_CNF_C": "Sei sicuro di voler eliminare il profilo?",
                    "DELETE_CNF_P": "Sei sicuro di voler eliminare il progetto?",
                    "DELETE_CNF_CANCEL": "Annulla",
                    "DELETE_CNF_CONFIRM": "Conferma ",
                    "LOADING": "Sto caricando....",
                    "POPUP_DEL": "Elimina",
                    "POPUP_MOD": "Configura",

                    //ADMIN-NewUserForm
                    "POPUP_ADD": "Aggiungi utente",
                    "MODAL_HEADER": "Nuovo utente",
                    "MISSING_DATA_H": "Dati mancanti!",
                    "MISSING_DATA_C": "I campi segnati con * sono obbligatori",
                    "CREATED_USR_H": "Tutto ok!",
                    "CREATED_USR_C": "Utente creato correttamente",

                    //ADMIN-UsrConfig
                    "USR_CNFG_H": "Modifica Utente",
                    "USR_CNFG_CUR_VAL": "Valore Attuale",
                    "USR_CNFG_NEW_VAL": "Nuovo Valore",
                    "USR_CNFG_MISSING_DATA_H": "Dato Mancante!",
                    "USR_CNFG_MISSING_DATA_B": "Devi specificare un valore per il dato da modificare",

                    //ADMIN-AllGroups
                    "ALLGROUPS_REMOVE": "Sei sicuro di voler rimuovere l'utente dal gruppo?",
                    "ADDUSR_HELPER": "Cerca l'utente da inserire nel team:",
                    "ALLGROUPS_ADDUSR_H": "Aggiunta Utente",
                    "ADDUSR_SEARCH_NAME": "Per nome e cognome",
                    "ADDUSR_SEARCH_EMAIL": "Per email",
                    "ADDUSR_SEARCH_USER": "Per username",
                    "ADDUSR_SEARCH_BTN": "Cerca",
                    "ADDUSR_MISSING_DATA": "Devi inserire almeno un valore nei campi di ricerca!",

                    //UPLOAD Symbol
                    "UPSY_SELECTIMG": "Seleziona un'immagine",
                    "UPSY_WORD": "Parola",
                    "UPSY_CLASS": "Classe",
                    "UPSY_CLASS": "Classe",
                    "UPSY_IMGTYPE": "Tipo di immagine",
                    "UPSY_PRIVATEIMG": "Questa immagine è privata",
                    "UPSY_IMGCOLOR": "Colore dell'immagine",
                    "UPSY_IMGCOLOR_BW": "Bianco e nero",
                    "UPSY_IMGCOLOR_COL": "Colorata",
                    "UPSY_IMGSTYLE": "Stile immagine",
                    "UPSY_IMGSTYLE_PLACEHOLDER": "Seleziona",
                    "UPSY_OPENDIALOG": "Apri il File Dialog",
                    "UPSY_WIDTH": "Larghezza: ",
                    "UPSY_HEIGHT": "Altezza: ",
                    "UPSY_SIZE": "Grandezza: ",
                    "UPSY_CUSTOMIMG": "Immagine personalizzata ",

                    //Popup
                    "POPUP_IMPORT": "Importa immagine",
                    "POPUP_MERGE_SX": "Unisci con la carta a sinistra",
                    "POPUP_MERGE_DX": "Unisci con la carta a destra",
                    "POPUP_UNLINK": "Dividi carte unite",
                    "POPUP_SHOW": "Mostra immagini alternative",
                    "POPUP_LOCK": "Blocca/Sblocca carte",
                    "POPUP_COPY": "Copia carta selezionata",
                    "POPUP_SEARCH": "Cerca",
                    "POPUP_ADD_SX": "Aggiungi carta prima",
                    "POPUP_ADD_DX": "Aggiungi carta dopo",
                    "POPUP_DELETE": "Elimina carta",

                    // ERROR
                    "ERR_FILESIZE_EXCEED": "Le dimensioni dell'immagine sono troppo alte (Max: 500Kb)",
                }
            },
            en: {
                translations: {
                    // HOMEPAGE
                    "MAIN_LBL_CREATE": "Create new Project",
                    "MAIN_BTN_BASIC": "Basic Project",
                    "MAIN_LBL_ALL": "All Project",
                    "MAIN_LBL_MANAGEPJ": "Manage your Project", //**
                    "MAIN_LBL_LAST": "Last modified Project",
                    "MAIN_LBL_NEWS": "Last News",
                    "MAIN_TBL_NAME": "Name",
                    "MAIN_TBL_PROFILEOWN": "Profile Owner",
                    "MAIN_TBL_DATEUPDATE": "Date Update", //**
                    "MAIN_TBL_NOTES": "Notes",
                    "MAIN_TBL_SHARE": "Share",
                    "MAIN_TBL_USEROWN": "User Owner", //**
                    "MAIN_TBL_PUBLIC": "Public",
                    "MAIN_TBL_PRIVATE": "Private",
                    "MAIN_TBL_ACTIONS": "Actions",
                    "MAIN_FRM_TITLE": "Project title",
                    "MAIN_FRM_PROFILE": "Project profile",
                    "MAIN_FRM_PLACEHOLDER_USER": "Cannot change user now",
                    "MAIN_FRM_LAYOUT": "Project layout",
                    "MAIN_FRM_PLACEHOLDER_LAYOUT": "Cannot change layout now",
                    "MAIN_FRM_SHARE": "Project private or public",
                    "MAIN_FRM_PUBLIC": "Make this Project public",
                    "MAIN_FRM_NOTES": "Project notes",
                    "MAIN_BTN_CREATE": "Create Project",
                    "MAIN_BTN_UPDATE": "Update Project",
                    "MAIN_BTN_CLOSE": "Close",
                    "MAIN_BTN_OR": "or",
                    "MAIN_LBL_ALLPROFILE": "All Profiles",
                    "MAIN_LBL_MANAGEPROFILE": "Manage your Profiles",//**
                    "MAIN_LBL_CREATEPROFILE": "Create new Profile",
                    "MAIN_LBL_UPDATEPROFILE": "Update Profile",
                    "MAIN_FRM_PROFILENAME": "Profile name",
                    "MAIN_BTN_FORWARD": "Forward",
                    "MAIN_BTN_BACK": "Back",
                    "MAIN_BTN_CREATEPROFILE": "Create Profile",
                    "MAIN_BTN_UPDATEPROFILE": "Update Profile",

                    // HOMEPAGE NAVBAR
                    "HOME_NAVBAR_LANGUAGE": "Language",
                    "HOME_NAVBAR_MANAGE": "Manage",
                    "HOME_NAVBAR_MANAGE_SYMBOL": "Upload Symbol",
                    "HOME_NAVBAR_USER": "User",
                    "HOME_NAVBAR_USER_PROFILE": "Profile",
                    "HOME_NAVBAR_USER_LOGOUT": "Logout",

                    // NAVBAR
                    "HEAD_BTN_OPTIONS": "Options",
                    "HEAD_BTN_EXPORT": "Export",
                    "HEAD_BTN_SAVE": "Save",
                    "HEAD_BTN_CLOSE": "Close",
                    "HEAD_BTN_VIEW": "View",
                    "HEAD_BTN_EDIT": "Edit",
                    "HEAD_BTN_TYPO": "typo",

                    // LAYOUT/TYPO
                    "HEAD_BTN_RESET": "Reset the layout",
                    "HEAD_BTN_EXPORTPDF": "Export as PDF",
                    "HEAD_BTN_ADD_IMGS": "Add custom images",
                    "HEAD_BTN_PRINT": "Print",
                    "HEAD_BTN_RETURN": "Return to Project",
                    "TYPO_FRM_PLACEHOLDER": "Select image size",
                    "TYPO_HDR_CUSTOMTITLE": "Add custom title",
                    "TYPO_BTN_CUSTOMTITLE": "Add title",
                    "TYPO_BTN_CUSTOMTEXT": "Add text",
                    "TYPO_HDR_CUSTOMTEXT": "Add custom text",
                    "TYPO_LBL_TEXT": "Text",
                    "TYPO_LBL_SIZETEXT": "Text size",
                    "TYPO_LBL_COLORTEXT": "Text background color",
                    "TYPO_LBL_INVERTEDTEXT": "Inverted color",
                    "TYPO_LBL_PREVIEW": "Preview",
                    "TYPO_HDR_DELETECUSTOM": "Delete custom elements",

                    //MODAL TO UPLOAD IMGS VIA DnD
                    "MODAL_IMGS_DND_HEADER": "Upload custom images!",
                    "MODAL_IMGS_DND_HELPER": "Drag & Drop your image to upload it",
                    "MODAL_IMGS_DND_DROPZONE_HELPER": "Drag & Drop here, or click to upload",
                    "MODAL_IMGS_DND_UPLOADED": "Cheers, image uploaded correctly!",
                    "MODAL_WARNING_TYPE": "Only *.jpeg and *.png images will be accepted",
                    "MODAL_IMGS_DND_UPERROR": "There are issues with the last image, try again",
                    "MODAL_IMGS_DND_UPLOADED_LIST": "Images uploaded:",
                    "MODAL_IMGS_DND_UPLOADING": "Uploading....",

                    // OPTIONS
                    "OPT_LBL_EDITOPTIONS": "Edit Options",
                    "OPT_LBL_TEXTFORMAT": "Text format",
                    "OPT_LBL_INPUTPOSITION": "Input position",
                    "OPT_LBL_INPUTSTYLE": "Input style",
                    "OPT_LBL_SIZEINPUT": "Input size",
                    "OPT_LBL_FONTWEIGHTINPUT": "Input weight",
                    "OPT_LBL_FONTDECORATIONINPUT": "Input decoration",
                    "OPT_LBL_FONTSTYLEINPUT": "Input style",
                    "OPT_LBL_TEXTCOLOR": "Text color",
                    "OPT_LBL_TEXTBKGCOLOR": "Input color",
                    "OPT_LBL_IMAGESIZE": "Image size",
                    "OPT_LBL_IMAGEPADDING": "Image padding",
                    "OPT_LBL_IMAGECOLORPREF": "Image color preferences",
                    "OPT_LBL_IMAGETYPEPREF": "Image type preferences",
                    "OPT_LBL_BORDERCOLOR": "Border color",
                    "OPT_LBL_BORDERTYPE": "Border type",
                    "OPT_LBL_BORDERSIZE": "Border size",
                    "OPT_BTN_CANCELEXIT": "Cancel and Exit",
                    "OPT_BTN_SAVEEXIT": "Save and Exit",
                    "OPT_MNU_INPUTOPTIONS": "Input",
                    "OPT_MNU_IMAGEOPTIONS": "Image",
                    "OPT_MNU_CARDOPTIONS": "Card",
                    "OPT_MNU_PROFILEOPTIONS": "Profile",
                    "OPT_MNU_PROJECTOPTIONS": "Project",
                    "OPT_FRM_FREE": "Free",
                    "OPT_FRM_UPPERCASE": "Uppercase",
                    "OPT_FRM_LOWERCASE": "Lowercase",
                    "OPT_FRM_TOP": "Top",
                    "OPT_FRM_BOTTOM": "Bottom",
                    "OPT_FRM_NORMAL": "Normal",
                    "OPT_FRM_TRANSPARENT": "Transparent",
                    "OPT_FRM_MINI": "Mini",
                    "OPT_FRM_SMALL": "Small",
                    "OPT_FRM_LARGE": "Large",
                    "OPT_FRM_BIG": "Big",
                    "OPT_FRM_HUGE": "Huge",
                    "OPT_FRM_MASSIVE": "Massive",
                    "OPT_FRM_BOLD": "Bold",
                    "OPT_FRM_OVERLINE": "Overline",
                    "OPT_FRM_UNDERLINE": "Underline",
                    "OPT_FRM_ITALIC": "Italic",
                    "OPT_FRM_OBLIQUE": "Oblique",
                    "OPT_FRM_COLOR": "Color",
                    "OPT_FRM_BLACKANDWHITE" : "Black and White",
                    "OPT_FRM_DASHED": "Dashed",
                    "OPT_FRM_DOTTED": "Dotted",
                    "OPT_FRM_DOUBLE": "Double",
                    "OPT_FRM_SOLID": "Solid",

                    // PROJECT
                    "PRJ_MNU_BACK": "Turn to Homepage",
                    "PRJ_MNU_OPTIONS": "Options",
                    "PRJ_MNU_ADDPROFILE": "Add Profile",
                    "PRJ_BTN_EDIT": "Edit",
                    "PRJ_BTN_VIEW": "View",
                    "PRJ_BTN_DELETE": "Delete",
                    "PRJ_LBL_NEWCHAPT": "New Chapter",
                    "PRJ_LBL_INFO": "Click on the icon to add a new chapther to this project",
                    "PRJ_FRM_HEADER": "Create new Chapter",
                    "PRJ_FRM_TITLE": "Chapter Title",
                    "PRJ_FRM_ERROR_HEADER": "Error",
                    "PRJ_FRM_ERROR_CONTENT": "The project title cannot be empty",
                    "PRJ_FRM_LAYOUT": "Chapter Layout",
                    "PRJ_BTN_CREATE": "Create Chapter",
                    "PRJ_BTN_CLOSE": "Close",

                    //MISC
                    "INTERROR_HEADER": "An error occured!",
                    "INTERROR_BODY": "System erro, try again later",
                    "BTN_CONTINUE": "Continue",
                    "BTN_DENY": "Deny",
                    "BTN_CONFIRM": "Confirm",
                    "BTN_MOD": "Modify",

                    //ADMINISTRATION

                    //ADMIN-MENU
                    "ADM_MNU_USRS": "Users",
                    "ADM_MNU_GROUPS": "Teams",
                    "ADM_MNU_BACK": "Go back to projects",

                    //ADMIN-ALLUSERS
                    "TBL_NAME" : "Name",
                    "TBL_USR" : "Username",
                    "TBL_EMAIL" : "Email",
                    "TBL_ORG" : "Organization",
                    "TBL_LWEB" : "Website",
                    "TBL_GROUP" : "Role",
                    "TBL_TEAM" : "Team",
                    "TBL_ACTION" : "Action",
                    "DELETE_CNF_H": "This action cannot be reversed!",
                    "DELETE_CNF_C": "Do you really want to delete the profile?",
                    "DELETE_CNF_P": "Do you really want to delete the project?",
                    "DELETE_CNF_CANCEL": "Cancel",
                    "DELETE_CNF_CONFIRM": "OK",
                    "LOADING": "I'm loading....",
                    "POPUP_DEL": "Delete",
                    "POPUP_MOD": "Manage",

                    //ADMIN-NewUserForm
                    "POPUP_ADD": "Add user",
                    "MODAL_HEADER": "New user",
                    "MISSING_DATA_H": "Missing data!",
                    "MISSING_DATA_C": "Field checked with * are mandatory",
                    "CREATED_USR_H": "Everything ok!",
                    "CREATED_USR_C": "User succesfully created",

                    //ADMIN-UsrConfig
                    "USR_CNFG_H": "User Configuration",
                    "USR_CNFG_CUR_VAL": "Current Value",
                    "USR_CNFG_NEW_VAL": "New Value",
                    "USR_CNFG_MISSING_DATA_H": "Missing Data!",
                    "USR_CNFG_MISSING_DATA_B": "You must specify a proper value in order to modify the attribute",

                    //ADMIN-AllGroups
                    "ALLGROUPS_REMOVE": "Do you really want to remove the user from the team?",
                    "ADDUSR_HELPER": "Search for the user to insert in the team:",
                    "ALLGROUPS_ADDUSR_H": "Adding User",
                    "ADDUSR_SEARCH_NAME": "By name & surname",
                    "ADDUSR_SEARCH_EMAIL": "By email",
                    "ADDUSR_SEARCH_USER": "By username",
                    "ADDUSR_SEARCH_BTN": "Search",
                    "ADDUSR_MISSING_DATA": "You must specify at least one of the search parameters",

                    //UPLOAD Symbol
                    "UPSY_SELECTIMG": "Select an Image",
                    "UPSY_WORD": "Word: ",
                    "UPSY_CLASS": "Class",
                    "UPSY_IMGTYPE": "Image Type",
                    "UPSY_PRIVATEIMG": "This image is private",
                    "UPSY_IMGCOLOR": "Image Color: ",
                    "UPSY_IMGCOLOR_BW": "Black and White",
                    "UPSY_IMGCOLOR_COL": "Color",
                    "UPSY_IMGSTYLE": "Image Style",
                    "UPSY_IMGSTYLE_PLACEHOLDER": "Select",
                    "UPSY_OPENDIALOG": "Open File Dialog",
                    "UPSY_WIDTH": "Width: ",
                    "UPSY_HEIGHT": "Height: ",
                    "UPSY_SIZE": "Size: ",
                    "UPSY_CUSTOMIMG": "Custom Image ",

                    //Popup
                    "POPUP_IMPORT": "Import image",
                    "POPUP_MERGE_SX": "Merge with left card",
                    "POPUP_MERGE_DX": "Merge with right card",
                    "POPUP_UNLINK": "Unlink card linked",
                    "POPUP_SHOW": "Show alternatives images",
                    "POPUP_LOCK": "Lock/Unlock cards",
                    "POPUP_COPY": "Copy current card",
                    "POPUP_SEARCH": "Search",
                    "POPUP_ADD_SX": "Add a card before",
                    "POPUP_ADD_DX": "Add a card after",
                    "POPUP_DELETE": "Delete card",

                    // ERROR
                    "ERR_FILESIZE_EXCEED": "The size of the image is too high (Max: 500Kb)",
                }
            }
        },
        fallbackLng: 'en',

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ','
        },

        react: {
            wait: true
        }
    });

export default i18n;
