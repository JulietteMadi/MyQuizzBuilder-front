import { createI18n } from "vue-i18n";
import enMessages from "./en";
import frMessages from "./fr";

const shortDatetimeFormat = {
    year: 'numeric', month: '2-digit', day: '2-digit'
}

const longDatetimeFormat = {
    year: 'numeric', month: 'long', day: 'numeric'
}

const datetimeFormats = {
    'en': {
        short: shortDatetimeFormat,
        long: longDatetimeFormat
    },
    'fr': {
        short: shortDatetimeFormat,
        long: longDatetimeFormat
    }
}


const i18n = createI18n({
    locale: 'fr',
    fallbackLocale: 'fr',
    messages: {
        fr: frMessages,
        en: enMessages
    },
    datetimeFormats
})

export default i18n