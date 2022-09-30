declare type configOpts = {
    js_api_lists?: string[];
    capabilities: string[];
};

declare type config = {
    runningContext: string;
};

declare type user = {
    id: string;
    role: string;
    screenName: string;
};

export declare type Participant = { 
    screenName: string; 
    participantId: string; 
    participantUUID: string; 
    role: string 
};

type EventCallbackType = (eventInfo: any) => void
type EventType = (event: string, callBack: EventCallbackType) => void

export interface ZoomSDK {
    config: (opts: configOpts) => Promise<config>;
    connect: () => Promise<void>;
    getUserContext: () => Promise<user>;
    getMeetingUUID: () => Promise<{ meetingUUID: string; parentUUID?: string }>;
    getMeetingParticipants: () => Promise<{participants: Participant[]}>;
    postMessage: (opts: never) => Promise<void>;
    onMessage: (func: (opts: never) => void) => void;
    onParticipantChange: (func: (opts: never) => void) => void;
    addEventListener: EventType;
}
