# Survival Guide for Keyboardist

<link rel="icon" href="./favicon-flash.ico" type="image/x-icon">

# pacman

```sh
sudo pacman -Syu     # Sync package databases and upgrade all packages (full system upgrade)
sudo pacman -Syyu    # Force refresh all package databases and do full upgrade (heavier)

sudo pacman -S pkg   # Install a package
sudo pacman -U pkg   # Install a local package file

sudo pacman -Rns pkg # Remove a package, its unused dependencies, and its config files

pacman -Ss keyword   # Search packages in sync databases (remote repos)
pacman -Si pkg       # Show detailed info about a remote package

pacman -Qs keyword   # Search installed packages (local database)
pacman -Qi pkg       # Show detailed info about an installed package
pacman -Qe           # List explicitly installed packages
pacman -Qm           # List "foreign" packages (not from official repos; often AUR/manual)
pacman -Qdtq         # List orphaned dependencies quietly
```

# K8s

```sh
kubectl cluster-info               # Display cluster information
kubectl config get-contexts        # List all kubeconfig contexts
kubectl config use-context context # Switch current context
kubectl get nodes                  # List all nodes in the cluster
kubectl describe node node         # Show detailed information about a node
kubectl get ns                     # List all namespaces
kubectl create ns namespace        # Create a namespace
kubectl get pods -n namespace      # List pods in a specific namespace
kubectl get pods -o wide           # List pods with node and IP info
kubectl describe pod pod           # Show detailed pod info and events
kubectl logs pod                   # Show logs for a pod
kubectl logs pod -c container      # Show logs for a specific container in a pod
kubectl exec -it pod -- /bin/sh    # Execute a shell inside a container
```

# Linux Terminal

```sh
Ctrl + a # Move cursor to beginning of line
Ctrl + e # Move cursor to end of line
Ctrl + b # Backward one character
Ctrl + f # Forward one character
Ctrl + p # Previous history entry
Ctrl + n # Next history entry
Ctrl + r # Reverse history search
Ctrl + g # Abort search / cancel
Ctrl + u # Kill to beginning of line
Ctrl + k # Kill to end of line
Ctrl + w # Kill previous word
Ctrl + y # Yank (paste)
Ctrl + d # Delete char under cursor / EOF if empty line
Ctrl + l # Clear screen
Ctrl + c # Interrupt (SIGINT)
Ctrl + z # Suspend (SIGTSTP)
Ctrl + t # Transpose characters
Ctrl + _ # Undo

Alt + b  # Backward one word
Alt + f  # Forward one word
Alt + d  # Kill next word

Alt + u  # Uppercase word
Alt + l  # Lowercase word
Alt + c  # Capitalize word

Alt + .  # Insert last argument of previous command
Alt + y  # Rotate kill ring (after Ctrl+y)
Alt + t  # Transpose words
```
