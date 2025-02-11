# Use an official lightweight Node image as a base
FROM node:18-bullseye-slim

# Install dependencies needed for Bun, Git, and basic tools with cleanup
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl git bash unzip sudo ca-certificates openssh-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create a new user named "vscode" with a home directory and bash shell
RUN useradd -ms /bin/bash vscode

# Grant "vscode" user passwordless sudo privileges
RUN echo "vscode ALL=(ALL) NOPASSWD: /usr/bin/apt-get, /usr/bin/apt, /usr/bin/pnpm" >> /etc/sudoers.d/vscode && \
    chmod 0440 /etc/sudoers.d/vscode

# Install tools as root
RUN npm install -g pnpm

# Switch to the "vscode" user
USER vscode

# Install Bun for the vscode user
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV BUN_INSTALL="/home/vscode/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

# Default command
CMD ["bash"]

# Update WORKDIR
WORKDIR /vscode