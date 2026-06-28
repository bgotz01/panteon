'use client';

import { createContext, useContext, useState } from 'react';

interface ChatContextValue {
    open: boolean;
    setOpen: (v: boolean) => void;
}

const ChatContext = createContext<ChatContextValue>({
    open: false,
    setOpen: () => { },
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <ChatContext.Provider value={{ open, setOpen }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChatModal() {
    return useContext(ChatContext);
}
