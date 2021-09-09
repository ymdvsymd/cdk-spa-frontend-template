import * as cdk from "@aws-cdk/core";
import * as str from "../lib/string";

export class Context {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private self: { tryGetContext: (key: string) => any }) {}

  get name(): string {
    return this.self.tryGetContext("name");
  }

  get env(): string {
    return this.self.tryGetContext("env");
  }

  get domain(): string {
    return this.self.tryGetContext("domain");
  }

  get certArn(): string {
    return this.self.tryGetContext("certArn");
  }

  get frontend(): string {
    return this.self.tryGetContext("frontend");
  }

  get stackPrefix(): string {
    return str.upperCamelCase(this.name) + str.upperCamelCase(this.env);
  }

  get frontendDomain(): string {
    return `${this.frontend}-${this.env}.${this.domain}`;
  }
}

export interface StackProps extends cdk.StackProps {
  context: Context;
}
