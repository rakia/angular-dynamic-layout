export interface UpdateTab<T> {
    key:           any;
    index:         number;
    updateTabData: UpdatePageData<T>;
}

export interface UpdatePageData<T> {
    mode:    UpdateMode;
    entity?: T;
}

export declare type UpdateMode = 'create' | 'edit';

export declare type UpdateLayout = 'dialog' | 'tabs' | 'page';
