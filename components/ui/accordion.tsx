'use client'

import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type AccordionContextValue = {
  collapsible: boolean
  openValue: string | null
  setOpenValue: (value: string) => void
}

type AccordionItemContextValue = {
  isOpen: boolean
  value: string
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null)

type AccordionProps = React.ComponentProps<'div'> & {
  type?: 'single'
  collapsible?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

function Accordion({
  type = 'single',
  collapsible = false,
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const openValue = value ?? internalValue

  const setOpenValue = React.useCallback(
    (nextValue: string) => {
      const resolvedValue = openValue === nextValue ? (collapsible ? '' : nextValue) : nextValue

      if (value === undefined) {
        setInternalValue(resolvedValue)
      }

      onValueChange?.(resolvedValue)
    },
    [collapsible, onValueChange, openValue, value],
  )

  if (type !== 'single') {
    throw new Error('Only single accordion mode is supported.')
  }

  return (
    <AccordionContext.Provider
      value={{
        collapsible,
        openValue: openValue || null,
        setOpenValue,
      }}
    >
      <div data-slot="accordion" className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

type AccordionItemProps = React.ComponentProps<'div'> & {
  value: string
}

function AccordionItem({
  className,
  value,
  children,
  ...props
}: AccordionItemProps) {
  const accordion = React.useContext(AccordionContext)

  if (!accordion) {
    throw new Error('AccordionItem must be used within Accordion.')
  }

  const isOpen = accordion.openValue === value

  return (
    <AccordionItemContext.Provider value={{ isOpen, value }}>
      <div
        data-slot="accordion-item"
        data-state={isOpen ? 'open' : 'closed'}
        className={cn('border-b last:border-b-0', className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<'button'>) {
  const accordion = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)

  if (!accordion || !item) {
    throw new Error('AccordionTrigger must be used within AccordionItem.')
  }

  return (
    <h3 className="flex">
      <button
        type="button"
        data-slot="accordion-trigger"
        data-state={item.isOpen ? 'open' : 'closed'}
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        onClick={() => accordion.setOpenValue(item.value)}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </button>
    </h3>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const item = React.useContext(AccordionItemContext)

  if (!item) {
    throw new Error('AccordionContent must be used within AccordionItem.')
  }

  if (!item.isOpen) {
    return null
  }

  return (
    <div
      data-slot="accordion-content"
      data-state="open"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
