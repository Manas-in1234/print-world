import type { DesignState } from "@/lib/editor/types";

export function cloneDesign(state: DesignState): DesignState {
  return JSON.parse(JSON.stringify(state)) as DesignState;
}

export class DesignHistory {
  private past: DesignState[] = [];
  private future: DesignState[] = [];

  push(state: DesignState) {
    this.past.push(cloneDesign(state));
    if (this.past.length > 50) this.past.shift();
    this.future = [];
  }

  undo(current: DesignState): DesignState | null {
    if (this.past.length === 0) return null;
    this.future.push(cloneDesign(current));
    return this.past.pop() ?? null;
  }

  redo(current: DesignState): DesignState | null {
    if (this.future.length === 0) return null;
    this.past.push(cloneDesign(current));
    return this.future.pop() ?? null;
  }

  reset() {
    this.past = [];
    this.future = [];
  }
}
