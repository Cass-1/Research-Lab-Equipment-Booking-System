# Use an official lightweight Node image as a base
FROM node:18-bullseye-slim

# Install dependencies needed for Bun, Git, and basic tools
RUN apt-get update && apt-get install -y curl git bash unzip sudo

# Create a new user named "vscode" with a home directory and bash shell
RUN useradd -ms /bin/bash vscode

# Grant "vscode" user passwordless sudo privileges
RUN echo "vscode ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Ensure the "vscode" user owns the workspace directory
RUN mkdir -p /workspaces && chown vscode:vscode /workspaces

# Switch to the "vscode" user
USER vscode

# Install Bun for the vscode user
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV BUN_INSTALL="/home/vscode/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

# Ensure vscode owns all files in /workspaces
RUN sudo chown -R vscode:vscode /workspaces

# Set the working directory
WORKDIR /workspaces

# Expose ports if needed
EXPOSE 3000 4000

# Default command
CMD ["bash"]
