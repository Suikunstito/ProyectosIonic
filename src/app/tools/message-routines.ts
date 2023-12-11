import { AlertController, ToastController } from "@ionic/angular";
import { MessageEnum } from "./message-enum";

export let showLogs: boolean = true;

export const getAppName = (): string => {
    return 'Asistencia DUOC';
}

export const log = (source: string, message: string, returnValue?: boolean): any => {
    if (showLogs) {
        const red = 'color: red;';
        const green = 'color: dark green;';
        const blue = 'color: blue;';
        const black = 'color: blue;';
        const yellow = 'background-color: yellow;';
        const cyan = 'background-color: cyan;';
        const magenta = 'background-color: magenta;';
        const chocolate = 'background-color: chocolate;';
        let color1 = 'color: gray';
        let color2 = 'color: gray';

        if (source === 'StartSQLiteService') { color1 = yellow;    color2 = black;}
        if (source === 'StorageService')     { color1 = red;       color2 = black;}
        if (source === 'isLogged')           { color1 = blue;      color2 = black;}
        if (source === 'isAuthenticated')    { color1 = green;     color2 = black;}
        if (source === 'LoginGuardService')  { color1 = cyan;      color2 = black;}
        if (source === 'HomePage')           { color1 = chocolate; color2 = black;}

        console.log(`%c${source}:%c ${message}`, color1, color2);
    }
    if (returnValue) return returnValue;
    return;
}

export const showToast = async (message:string, duration?: number) => {
    const controler = new ToastController();
    const toast = await controler.create({ message:message, duration: duration?duration:2000 });
    await toast.present();
}

export const showAlert = async (header: string, message: string): Promise<void> => {
    return new Promise((resolve) => {
        let alert = new AlertController().create({
            header, message, cssClass: 'custom-alert', buttons: [{ text: 'Aceptar', handler: () => resolve() }]
        }).then((value: HTMLIonAlertElement) => value.present());
    });
}

export const showAlertYesNo = async (header: string, message: string): Promise<MessageEnum> => {
    return new Promise((resolve) => {
        let alert = new AlertController().create({
            header, message, 
            buttons: [
                { text: 'Sí', handler: () => { resolve(MessageEnum.YES); } },
                { text: 'No', handler: () => { resolve(MessageEnum.NO) } },
                { text: 'Cancelar', handler: () => { resolve(MessageEnum.CANCEL) } },
            ]
        }).then((value: HTMLIonAlertElement) => value.present());
    });
}

export const getSpecialMessage = (message: string, callAdmin?: boolean, tryAgain?: boolean): string => {
    if (message.substr(message.length - 1) !== '.') message += '.';
    if (callAdmin === undefined) callAdmin = false;
    if (tryAgain === undefined) tryAgain = false;
    if (callAdmin && tryAgain) message += ' Por favor, comuníquese con el Administrador del Sistema '
        + 'o intente nuevamente más tarde.';
    if (callAdmin && !tryAgain) message += ' Por favor, comuníquese con el Administrador del Sistema.';
    if (!callAdmin && tryAgain) message += ' Por favor, intente nuevamente más tarde.';
    return message;
}

export const showAlertYesNoDUOC = async (message: string): Promise<MessageEnum> => {
    return new Promise((resolve) => {
        if (message.trim() === '') resolve(MessageEnum.CANCEL);
        let alert = new AlertController().create({
            header: getAppName(),
            message, 
            buttons: [
                { text: 'Sí', handler: () => { resolve(MessageEnum.YES); } },
                { text: 'No', handler: () => { resolve(MessageEnum.NO) } },
            ]
        }).then((value: HTMLIonAlertElement) => value.present());
    });
}

export const showAlertError = (source: string, err: Error) => {
    const erroMessage = `Error en ${source}. ${err.message}. ` +
        `Por favor, comuníquese con el Administrador del Sistema o intente nuevamente más tarde.`;
    if (showLogs) console.log('🐞' + erroMessage);
    let alert = new AlertController().create({
        header: 'Error del Sistema', message: erroMessage, 
        buttons: [
            { text: 'Aceptar' }
        ]
    }).then(async (value: HTMLIonAlertElement) => await value.present());
}

export const showAlertDUOC = async (message: string, callAdmin?: boolean, tryAgain?: boolean): Promise<void> => {
    return new Promise((resolve) => {
        let alert = new AlertController().create({
            header: getAppName(),
            message: getSpecialMessage(message, callAdmin, tryAgain),
            buttons: [{ text: 'Aceptar', handler: () => resolve() }]
        }).then((value: HTMLIonAlertElement) => value.present());
    });
}

export const mostrarEjemplosDeMensajes = async () => {
    showToast('Este es un mensaje toast');
    await showAlertDUOC('Este es un mensaje de alerta');
    await showAlertDUOC('Alerta 1', true);
    await showAlertDUOC('Alerta 2', false, true);
    await showAlertDUOC('Alerta 3', true, true);
    let response = await showAlertYesNoDUOC('Esta es una prueba de la función "showAlertYesNoDUOC" ' +
        'que permite escoger entre las alternativas Sí y No');
    if (response == MessageEnum.YES) await showAlertDUOC('El usuario ha contestado Yes');
    if (response == MessageEnum.NO) await showAlertDUOC('El usuario ha contestado No');
    if (response == MessageEnum.CANCEL) await showAlertDUOC('El usuario ha contestado Cancel');
}