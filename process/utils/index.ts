import mitt, { Emitter } from "mitt";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1. Define all possible event types
type AppEvents = {
  Loading: boolean | undefined;
  SignInViewFile: any;
  openModal: void;
  closeModal: void;
  [key: string]: any; // For dynamic modal events
};

// 2. Create the main event emitter
export const eventEmitter: Emitter<AppEvents> = mitt<AppEvents>();

// 3. Helper function for loading state
export const onSetLoading = (status: boolean = false) => {
  eventEmitter.emit("Loading", status);
};

// 4. Type-safe event listener for SignInViewFile
export const onSignInViewFile = (
  callback: (data: any) => Promise<void> | void,
) => {
  eventEmitter.on("SignInViewFile", (data) => {
    callback(data);
  });
};

// 5. Helper for bottom sheet visibility
export const onShowBottomSheet = (status: boolean) => {
  eventEmitter.emit(status ? "openModal" : "closeModal");
};

// 6. Alias for backward compatibility
export const eventBus = eventEmitter;
