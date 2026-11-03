import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import { Kbd } from "@/components/ui/kbd"

type SearchbarProps = {
  placeholder: string
}

export function Searchbar({ placeholder }: SearchbarProps) {
  return (
    <InputGroup className="w-90 rounded-md">
      <InputGroupInput placeholder={placeholder} />
      <InputGroupAddon>
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupAddon
        className="rounded-md text-muted-foreground"
        align="inline-end"
      >
        <Kbd>
          Ctrl+K
        </Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}