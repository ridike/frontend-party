export class Debounce<TInput> {
  private currentTimeout: any = null

  constructor(private action: (i: TInput) => void, private delay: number) {
  }

  clear() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout)
    }
  }

  trigger(input: TInput) {
    this.clear()
    this.currentTimeout = setTimeout(() => this.action(input), this.delay)
  }

  triggerNow(input: TInput) {
    this.clear()
    return this.action(input)
  }

}

export interface VoidDebounce extends Debounce<void> {
  trigger(): Promise<void>
  triggerNow(): void
}

export function debounce(action: () => void, delay: number): VoidDebounce
export function debounce<TInput>(action: (i: TInput) => void, delay: number): Debounce<TInput> {
  return new Debounce(action, delay)
}
