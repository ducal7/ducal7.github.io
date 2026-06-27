import { useEffect, useState } from 'react'
import { GOATCOUNTER_CODE, GOATCOUNTER_ENABLED } from '../config'

export type VisitorState = {
  label: string
  value: string
  source: 'global' | 'local'
}

function bumpLocalVisits(): string {
  try {
    const key = 'ducal7.visits'
    const n = (parseInt(localStorage.getItem(key) || '0', 10) || 0) + 1
    localStorage.setItem(key, String(n))
    return String(n)
  } catch {
    return '1'
  }
}

/**
 * Visitor count that always shows a real number:
 *  - Immediately shows this browser's own visit count (localStorage) — real, no
 *    network needed.
 *  - If GoatCounter is configured, records the pageview and, when the public
 *    counter endpoint is reachable, upgrades the tile to the REAL global total.
 * It never fabricates a number; it just degrades to a true local count.
 */
export function useVisitorCount(): VisitorState {
  const [state, setState] = useState<VisitorState>({
    label: 'Your visits',
    value: '—',
    source: 'local',
  })

  useEffect(() => {
    // immediate, always-real base
    setState({ label: 'Your visits', value: bumpLocalVisits(), source: 'local' })

    if (!GOATCOUNTER_ENABLED) return

    // record this pageview via the official, SPA- and DNT-aware count.js
    if (!document.querySelector('script[data-goatcounter]')) {
      const s = document.createElement('script')
      s.async = true
      s.src = '//gc.zgo.at/count.js'
      s.setAttribute('data-goatcounter', `https://${GOATCOUNTER_CODE}.goatcounter.com/count`)
      document.body.appendChild(s)
    }

    // upgrade to the real global total when the counter endpoint is reachable
    fetch(`https://${GOATCOUNTER_CODE}.goatcounter.com/counter/TOTAL.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: { count?: string }) => {
        if (d && d.count) setState({ label: 'Page views', value: String(d.count), source: 'global' })
      })
      .catch(() => {
        /* keep the real local count; never invent a global number */
      })
  }, [])

  return state
}
