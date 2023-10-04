import {generateTemplateFiles} from "generate-template-files";
import path from "path";
import * as fs from "fs";

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  }).capitalize();
}

generateTemplateFiles([
  {
    option: "Create Command",
    defaultCase: "(pascalCase)",
    entry: {
      folderPath: "./_template/commandTemplate/",
    },
    stringReplacers: [{ question: "Insert command name", slot: "__command__" }, {question: "Insert domain name", slot: "__domain__"}],
    output: {
      path: "./src/module/__domain__/domain",
      pathAndFileNameDefaultCase: "(kebabCase)",
      overwrite: true,
    },
    onComplete: (res) => {
      const implIndexPath = path.join(res.output.path, 'command', 'impl', 'index.ts');
      const handlerIndexPath = path.join(res.output.path, 'command', 'handler', 'index.ts');
      let implIndex = fs.readFileSync(implIndexPath).toString('utf8');
      let handlerIndex = fs.readFileSync(handlerIndexPath).toString('utf8');
      implIndex = implIndex + `export * from "./${res.output.files[1].split("/").pop().replace('.ts', '')}";\n`;
      const camelizeHandler =
          camelize(res.stringReplacers[0].slotValue) + 'Handler';
      handlerIndex = handlerIndex.match(/(.*)([\s\S]+export.*)(].*)/s);
      handlerIndex =
          handlerIndex[1] +
          `import { ${camelizeHandler} } from "./${res.output.files[0].split("/").pop().replace('.ts', '')}";\n` +
          handlerIndex[2] +
          `  ${camelizeHandler},\n` +
          handlerIndex[3];
      fs.writeFileSync(handlerIndexPath, handlerIndex);
      fs.writeFileSync(implIndexPath, implIndex);
    }
  },
  {
    option: "Create Event",
    defaultCase: "(pascalCase)",
    entry: {
      folderPath: "./_template/eventTemplate/",
    },
    stringReplacers: [{ question: "Insert event name", slot: "__event__" }, {question: "Insert domain name", slot: "__domain__"}],
    output: {
      path: "./src/module/__domain__/domain",
      pathAndFileNameDefaultCase: "(kebabCase)",
      overwrite: true,
    },
    onComplete: (res) => {
      const implIndexPath = path.join(res.output.path, 'event', 'impl', 'index.ts');
      let implIndex = fs.readFileSync(implIndexPath).toString('utf8');
      implIndex += `export * from "./${res.output.files[1].split("/").pop().replace('.ts', '')}";\n`;
      fs.writeFileSync(implIndexPath, implIndex);
      const projectionDir = `${res.output.path}/projection`;
      const projectionFiles = fs.readdirSync(projectionDir);
      const eventName = camelize(res.stringReplacers[0].slotValue).capitalize() + 'Event';
      const outputOnFunction = `\n  async on${eventName}(event: ${eventName}) {
      try {
      this.logger.log("Event started ${eventName}");
      const { payload } = event;
      this.logger.log("Event finished ${eventName}");
    } catch (e) {
      this.logger.error("An error has been thrown", { e });
    }
      }\n`;
      const justOuputOnFunction = `\n  async on${eventName}(event: ${eventName}) {}\n`;
      const outputImport = `import { ${eventName} } from "${path.join(res.output.files[1]).replace('.ts', '')}"\n`;
      for (const projectionFile of projectionFiles) {
        let projectionClass = fs.readFileSync(path.join(projectionDir, projectionFile)).toString('utf8');
        projectionClass = projectionClass.match(/(.*)([\s\S]+@Injectable.*)(}.*)/s);
        projectionClass =
            projectionClass[1] +
            outputImport +
            projectionClass[2] +
            outputOnFunction +
            projectionClass[3];
        fs.writeFileSync(path.join(projectionDir, projectionFile), projectionClass);
      }
      const aggregatePath = path.join(res.output.path, `${res.stringReplacers[1].slotValue}.aggregate.ts`);
      let aggregateClass = fs.readFileSync(aggregatePath).toString('utf8');
      aggregateClass = aggregateClass.match(/(.*)([\s\S]+export.*)(}.*)/s);
      aggregateClass = aggregateClass[1] + outputImport + aggregateClass[2] + justOuputOnFunction + aggregateClass[3];
      fs.writeFileSync(aggregatePath, aggregateClass);
    }
  },
  {
    option: "Create Projection",
    defaultCase: "(pascalCase)",
    entry: {
      folderPath: "./_template/projectionTemplate/",
    },
    stringReplacers: [{question: "Insert domain name", slot: "__domain__"}],
    output: {
      path: "./src/module/__domain__/domain",
      pathAndFileNameDefaultCase: "(kebabCase)",
      overwrite: true,
    },
  },
]);
