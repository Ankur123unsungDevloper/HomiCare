"use client"

import { useState } from "react"
import {
  Bell,
  CalendarClock,
  CheckCheck,
  ClipboardList,
  ShieldCheck,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

const initialReminders = [
  {
    id: 1,
    title: "Pending complaints",
    description: "Review complaints that are waiting for your attention.",
    time: "Requires attention",
    icon: ClipboardList,
    unread: true,
  },
  {
    id: 2,
    title: "Helper verification",
    description: "Check pending helper verification requests.",
    time: "Reminder",
    icon: ShieldCheck,
    unread: true,
  },
  {
    id: 3,
    title: "Today's bookings",
    description: "Review today's scheduled bookings.",
    time: "Reminder",
    icon: CalendarClock,
    unread: true,
  },
]

export function Notification() {
  const [open, setOpen] = useState(false)
  const [reminders, setReminders] = useState(initialReminders)

  const unreadCount = reminders.filter(
    (reminder) => reminder.unread
  ).length

  function markAllAsRead() {
    setReminders((current) =>
      current.map((reminder) => ({
        ...reminder,
        unread: false,
      }))
    )
  }

  function dismissReminder(id: number) {
    setReminders((current) =>
      current.filter((reminder) => reminder.id !== id)
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-5" />

          {unreadCount > 0 && (
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-foreground ring-2 ring-background" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-90 overflow-hidden rounded-xl p-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold">Reminders</h3>
            <p className="text-xs text-muted-foreground">
              You have {unreadCount} unread reminders
            </p>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={markAllAsRead}
            >
              <CheckCheck className="size-3.5" />
              Mark all read
            </Button>
          )}
        </div>

        <Separator />

        {/* Reminder list */}
        <div className="max-h-90 overflow-y-auto">
          {reminders.length > 0 ? (
            reminders.map((reminder) => {
              const Icon = reminder.icon

              return (
                <div
                  key={reminder.id}
                  className={`group relative flex gap-3 px-4 py-3 transition-colors hover:bg-muted/50 ${
                    reminder.unread ? "bg-muted/30" : ""
                  }`}
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Icon className="size-4 text-muted-foreground" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">
                        {reminder.title}
                      </p>

                      {reminder.unread && (
                        <span className="size-1.5 shrink-0 rounded-full bg-foreground" />
                      )}
                    </div>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {reminder.description}
                    </p>

                    <p className="mt-1.5 text-[11px] text-muted-foreground">
                      {reminder.time}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Dismiss reminder"
                    onClick={() => dismissReminder(reminder.id)}
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              )
            })
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
              <CheckCheck className="mb-2 size-8 text-muted-foreground" />

              <p className="text-sm font-medium">You&apos;re all caught up!</p>

              <p className="mt-1 text-xs text-muted-foreground">
                There are no reminders to show.
              </p>
            </div>
          )}
        </div>

        <Separator />

        {/* Footer */}
        <div className="p-2">
          <Button
            variant="ghost"
            className="h-8 w-full text-xs"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}