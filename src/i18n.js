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
                    "MAIN_LBL_ALL": "Tutti i Progetti",
                    "MAIN_LBL_LAST": "Ultimi Progetti modificati",
                    "MAIN_LBL_NEWS": "Ultime News",
                    "MAIN_TBL_NAME": "Nome",
                    "MAIN_TBL_NOTES": "Note",
                    "MAIN_TBL_ACTIONS": "Azioni",
                    "MAIN_FRM_TITLE": "Titolo del Progetto",
                    "MAIN_FRM_PROFILE": "Profilo del Progetto",
                    "MAIN_FRM_SHARE": "Progetto pubblico o privato",
                    "MAIN_FRM_PUBLIC": "Rendi questo Progetto pubblico",
                    "MAIN_FRM_NOTES": "Note del Progetto",
                    "MAIN_BTN_CREATE": "Crea il Progetto",
                    "MAIN_BTN_CLOSE": "Annulla",
                    "MAIN_LBL_ALLPROFILE": "Tutti i Profili",
                    "MAIN_LBL_CREATEPROFILE": "Crea nuovo Profilo",
                    "MAIN_LBL_UPDATEPROFILE": "Aggiorna Profilo",
                    "MAIN_FRM_PROFILENAME": "Nome del Profilo",
                    "MAIN_BTN_FORWARD": "Avanti",
                    "MAIN_BTN_BACK": "Indietro",
                    "MAIN_BTN_CREATEPROFILE": "Crea Profilo",
                    "MAIN_BTN_UPDATEPROFILE": "Aggiorna Profilo",

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

                    //MODAL TO UPLOAD IMGS VIA DnD
                    "MODAL_IMGS_DND_HEADER": "Caricamento di immagini personali!",
                    "MODAL_IMGS_DND_HELPER": "Trascina l'immagine nel riquadro per caricarla",
                    "MODAL_IMGS_DND_DROPZONE_HELPER": "Trascina qui l'immagine, oppure clicca il riquadro",
                    "MODAL_IMGS_DND_WRONG_FILETYPE": "Attenzione, puoi caricare soltanto immagini!",
                    "MODAL_IMGS_DND_UPLOADED": "Immagine caricata correttamente!",
                    "MODAL_IMGS_DND_UPERROR": "Errore nel caricamento dell'ultima immagine, riprova",
                    "MODAL_IMGS_DND_UPLOADED_LIST": "Immagini caricate:",
                    "MODAL_IMGS_DND_UPLOADING": "Sto caricando....",

                    // OPTIONS
                    "OPT_LBL_EDITOPTIONS": "Modifica Impostazioni",
                    "OPT_LBL_TEXTFORMAT": "Formato del Testo",
                    "OPT_LBL_INPUTPOSITION": "Posizione del Testo",
                    "OPT_LBL_INPUTSTYLE": "Stile della input",
                    "OPT_LBL_SIZEINPUT": "Dimensione della input",
                    "OPT_LBL_FONTWEIGHTINPUT": "Grassetto",
                    "OPT_LBL_FONTDECORATIONINPUT": "Sottolineato",
                    "OPT_LBL_FONTSTYLEINPUT": "Stile del Testo",
                    "OPT_LBL_TEXTCOLOR": "Colore del Testo",
                    "OPT_LBL_TEXTBKGCOLOR": "Colore della input",
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
                    "PRJ_BTN_EDIT": "Modifica",
                    "PRJ_BTN_OPTIONS": "Opzioni",
                    "PRJ_BTN_DELETE": "Elimina",
                    "PRJ_LBL_NEWCHAPT": "Nuovo Capitolo",
                    "PRJ_LBL_INFO": "Clicca sulla icona per creare un nuovo capitolo su questo progetto",
                    "PRJ_FRM_HEADER": "Crea nuovo capitolo",
                    "PRJ_FRM_TITLE": "Titolo del capitolo",
                    "PRJ_FRM_LAYOUT": "Layout del capitolo",
                    "PRJ_BTN_CREATE": "Crea Progetto",
                    "PRJ_BTN_CLOSE": "Chiudi",
                }
            },
            en: {
                translations: {
                    // HOMEPAGE
                    "MAIN_LBL_CREATE": "Create new Project",
                    "MAIN_BTN_BASIC": "Basic Project",
                    "MAIN_LBL_ALL": "All Project",
                    "MAIN_LBL_LAST": "Last modified Project",
                    "MAIN_LBL_NEWS": "Last News",
                    "MAIN_TBL_NAME": "Name",
                    "MAIN_TBL_NOTES": "Notes",
                    "MAIN_TBL_ACTIONS": "Actions",
                    "MAIN_FRM_TITLE": "Project title",
                    "MAIN_FRM_PROFILE": "Project profile",
                    "MAIN_FRM_SHARE": "Project private or public",
                    "MAIN_FRM_PUBLIC": "Make this Project private",
                    "MAIN_FRM_NOTES": "Project notes",
                    "MAIN_BTN_CREATE": "Create Project",
                    "MAIN_BTN_CLOSE": "Close",
                    "MAIN_LBL_ALLPROFILE": "All Profiles",
                    "MAIN_LBL_CREATEPROFILE": "Create new Profile",
                    "MAIN_LBL_UPDATEPROFILE": "Update Profile",
                    "MAIN_FRM_PROFILENAME": "Profile name",
                    "MAIN_BTN_FORWARD": "Forward",
                    "MAIN_BTN_BACK": "Back",
                    "MAIN_BTN_CREATEPROFILE": "Create Profile",
                    "MAIN_BTN_UPDATEPROFILE": "Update Profile",

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

                    //MODAL TO UPLOAD IMGS VIA DnD
                    "MODAL_IMGS_DND_HEADER": "Upload custom images!",
                    "MODAL_IMGS_DND_HELPER": "Drag & Drop your image to upload it",
                    "MODAL_IMGS_DND_DROPZONE_HELPER": "Drag & Drop here, or click to upload",
                    "MODAL_IMGS_DND_WRONG_FILETYPE" : "Sorry, you can upload only images",
                    "MODAL_IMGS_DND_UPLOADED": "Cheers, image uploaded correctly!",
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
                    "PRJ_BTN_EDIT": "Edit",
                    "PRJ_BTN_OPTIONS": "Options",
                    "PRJ_BTN_DELETE": "Delete",
                    "PRJ_LBL_NEWCHAPT": "New Chapter",
                    "PRJ_LBL_INFO": "Click on the icon to add a new chapther to this project",
                    "PRJ_FRM_HEADER": "Create new Chapter",
                    "PRJ_FRM_TITLE": "Chapter Title",
                    "PRJ_FRM_LAYOUT": "Chapter Layout",
                    "PRJ_BTN_CREATE": "Create Chapter",
                    "PRJ_BTN_CLOSE": "Close"
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
