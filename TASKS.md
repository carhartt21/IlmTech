# Tasks
## Open
- Add collapsable interactive workflow visualization to the example workflows in ai-services/workflow 
## Completed
- Fix production deployment: install missing dependencies (`@tailwindcss/postcss` etc.) on server, add `data-scroll-behavior="smooth"` to `<html>` (Next.js 16), remove CSS `scroll-behavior: smooth` rule

## Info 
- Server: 
ubuntu-8gb-nbg1-1
178.104.73.167
2a01:4f8:1c19:ecf5::/64
2a01:4f8:1c19:ecf5::1
- Deployment: rsync to /opt/ilmtech.de, `npm install && npm run build`, `systemctl restart ilmtech`
- SSH: `ssh -i ~/.ssh/hetzner root@178.104.73.167`	