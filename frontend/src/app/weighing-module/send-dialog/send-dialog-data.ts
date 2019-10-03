export interface SendDialogData {
    weight: number,
    hiveMark: number,
    date: Date,
    wirrbau: number,
    type: string,
    schleuderung: Schleuderung
}

// TODO remove redundance schleuderung.ts
export interface Schleuderung {
    jahr: string,
    sorte: string,
    standort: string
}