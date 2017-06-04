import { Injectable } from '@angular/core';

const KEY_PREFIX = "angular2Hero";

export class StorageService {
    constructor(private storage: Storage) {

    }

    get(key: string): any {
        let value = this.storage.getItem(`${KEY_PREFIX}_${key}`);
        try {
            return JSON.parse(value);
        } catch(e) {
            return value;
        }
    }

    set(key: string, value: any): void {
        this.storage.setItem(`${KEY_PREFIX}_${key}`, typeof value === "string" ? value : JSON.stringify(value));
    }

    remove(key: string): void {
        this.storage.removeItem(`${KEY_PREFIX}_${key}`);
    }

    clear(): void {
        this.storage.clear();
    }
}

@Injectable()
export class LocalStorageService extends StorageService {
    constructor() {
        super(localStorage);
    }
}

@Injectable()
export class SessionStorageService extends StorageService {
    constructor() {
        super(sessionStorage);
    }
}