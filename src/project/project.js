import {normalizeProject} from './input.js';
import {VOCABULARY_VERSION} from '../vocabulary/settings.js';
import {sha256} from '../shared/hash.js';
export {projectPath,analysisArgs,normalizeInput,normalizeProject} from './input.js';
export {loadProject} from '../compat/project-save.js';
export async function saveProject(project,selection=null) {
  const payload={project:normalizeProject(project),selection,vocabularyVersion:VOCABULARY_VERSION};
  return {format:'shi-browser-project',version:1,...payload,sha256:await sha256(new TextEncoder().encode(JSON.stringify(payload)))};
}
