const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'src/components/animate-ui/icons');
const files = fs.readdirSync(iconsDir);

files.forEach(file => {
  if (!file.endsWith('.jsx')) return;
  
  const filePath = path.join(iconsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove import type
  content = content.replace(/import \{ motion, type Variants \} from 'motion\/react';/g, "import { motion } from 'motion/react';");
  content = content.replace(/import \{[^}]*type [^}]*\} from '.\/icon';/g, (match) => {
    return match.replace(/type [^,}]*,?\s*/g, '');
  });
  content = content.replace(/,\s*\} from '.\/icon';/g, " } from './icon';"); 
  content = content.replace(/\{\s*,\s*/g, '{ ');

  // Remove type aliases
  content = content.replace(/type \w+Props = IconProps<[^>]+>;/g, '');
  
  // Remove satisfies and as const
  content = content.replace(/satisfies Record<string, Variants>/g, '');
  content = content.replace(/\} as const;/g, "};");
  content = content.replace(/\} as Variants/g, "}");

  // Remove more type annotations
  content = content.replace(/const animation: Record<string, Variants> =/g, "const animation =");
  content = content.replace(/: SVGMotionProps<SVGSVGElement>/g, "");
  content = content.replace(/: boolean/g, "");
  content = content.replace(/: number/g, "");
  content = content.replace(/: string/g, "");

  // Remove component props types
  content = content.replace(/function IconComponent\(\{([^)]+)\}\s*:\s*\w+Props\)/g, "function IconComponent({$1})");
  content = content.replace(/function ([A-Z]\w*)\((?:props)?\s*:\s*\w+Props\)/g, "function $1(props)");
  content = content.replace(/\(props\s*:\s*\w+Props\)/g, "(props)");

  // Remove exported types
  content = content.replace(/type \w+Props,\s*/g, '');
  content = content.replace(/type \w+Props as \w+Props,?\s*/g, '');
  content = content.replace(/,\s*type \w+Props/g, '');
  
  // Final cleanup for export block
  content = content.replace(/export \{[^}]*type [^}]*\};/g, (match) => {
      return match.replace(/type [^,}]*,?\s*/g, '').replace(/,\s*}/g, ' }');
  });

  fs.writeFileSync(filePath, content);
});

console.log(`Processed ${files.length} icon files.`);
