class MediaHandle {
    platform: string;
    handle: string;

    constructor(platform: string, handle: string) {
        this.handle = handle;
        this.platform = platform;
    }
}

export default MediaHandle;