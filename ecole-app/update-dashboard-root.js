const fs = require('fs');
const path = 'apps/web/src/features/dashboards/DashboardRoot.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import api if not there
if (!content.includes('import { api }')) {
  content = content.replace("import { Button } from '../../shared/components/ui/Button';", "import { Button } from '../../shared/components/ui/Button';\nimport { api } from '../../shared/lib/api';");
}

// Replace fetch calls with api calls
content = content.replace(/const res = await fetch\('\/api\/v1\/admins'\);/g, "const res = await api.get('/admins');");
content = content.replace(/const json = await res\.json\(\);/g, "const json = res.data;");
content = content.replace(/if \(!res\.ok\) throw new Error\('Failed to load admins'\);/g, "");

content = content.replace(/const res = await fetch\('\/api\/v1\/admins', \{\s*method: 'POST',\s*headers: \{ 'Content-Type': 'application\/json' \},\s*body: JSON\.stringify\(\{ login: newLogin, password: newPassword, email: newEmail, typeAdmin: newTypeAdmin \}\)\s*\}\);/g, "const res = await api.post('/admins', { login: newLogin, password: newPassword, email: newEmail, typeAdmin: newTypeAdmin });");
content = content.replace(/if \(!res\.ok\) \{\s*const err = await res\.json\(\);\s*throw new Error\(err\?\.error\?\.message \|\| 'Erreur création'\);\s*\}/g, "");

content = content.replace(/const response = await fetch\(`\/api\/v1\/admins\/\$\{admin\.id\}\/send-credentials`, \{ method: 'POST' \}\);/g, "const response = await api.post(`/admins/${admin.id}/send-credentials`);");
content = content.replace(/if \(!response\.ok\) \{\s*const err = await response\.json\(\);\s*throw new Error\(err\?\.error\?\.message \|\| 'Erreur d\\'envoi des identifiants'\);\s*\}/g, "");

content = content.replace(/const res = await fetch\(`\/api\/v1\/admins\/\$\{id\}`\, \{\s*method: 'PUT',\s*headers: \{ 'Content-Type': 'application\/json' \},\s*body: JSON\.stringify\(\{ actif: !admin\.actif \}\)\s*\}\);/g, "const res = await api.put(`/admins/${id}`, { actif: !admin.actif });");
content = content.replace(/if \(!res\.ok\) throw new Error\('Failed to toggle'\);/g, "");

content = content.replace(/const res = await fetch\(`\/api\/v1\/admins\/\$\{id\}`\, \{ method: 'DELETE' \}\);/g, "const res = await api.delete(`/admins/${id}`);");
content = content.replace(/if \(!res\.ok\) throw new Error\('Failed to delete'\);/g, "");

// catch clauses adjustment for axios
content = content.replace(/err\.message \|\|/g, "err.response?.data?.error?.message || err.message ||");

fs.writeFileSync(path, content, 'utf8');
