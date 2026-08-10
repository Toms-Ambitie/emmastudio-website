'use client';

import ChatVenster from './ChatVenster';
import { useChat } from './useChat';

/* Het chatvenster als losstaand blok, voor de testpagina. ChatVenster zelf is
   alleen weergave; ergens moet het gesprek vandaan komen, en op /chat-test is
   dat hier. In de rest van de site doet ChatKnop dat. */
export default function ChatAlleen() {
  return <ChatVenster chat={useChat()} />;
}
