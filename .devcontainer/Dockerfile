# Use an official lightweight Node image as a base
FROM node:18-bullseye-slim

# Install dependencies needed for Bun, Git, and basic tools with cleanup
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl git bash unzip sudo ca-certificates openssh-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install tools as root
RUN npm install -g pnpm

# Switch to the "vscode" user
USER node

# Install Bun for the vscode user
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV BUN_INSTALL="/home/node/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

# Default command
CMD ["bash"]rchtime
