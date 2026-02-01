# Survival Guide for Keyboardist

<link rel="icon" href="../FavIcons/favicon-flash.ico" type="image/x-icon">

# pacman

```sh
sudo pacman -Syu       # Sync package databases and upgrade all packages (full system upgrade)
sudo pacman -Syyu      # Force refresh all package databases and do full upgrade (heavier)

sudo pacman -S <pkg>   # Install a package
sudo pacman -U <pkg>   # Install a local package file

sudo pacman -Rns <pkg> # Remove a package, its unused dependencies, and its config files

pacman -Ss <keyword>   # Search packages in sync databases (remote repos)
pacman -Si <pkg>       # Show detailed info about a remote package

pacman -Qs <keyword>   # Search installed packages (local database)
pacman -Qi <pkg>       # Show detailed info about an installed package
pacman -Qe             # List explicitly installed packages
pacman -Qm             # List "foreign" packages (not from official repos; often AUR/manual)
pacman -Qdtq           # List orphaned dependencies quietly
```

# K8s

```sh
kubectl <verb> <resource> [name] [flags]
```

**Verbs**:

<div class="block-pair">
<div class="block-pair-item">

```sh
get      # List resources
describe # Detailed status + events (debug)
logs     # Container logs
top      # Resource usage (metrics-server)
```

<br>

```sh
exec         # Run command in container
cp           # Copy files
port-forward # Local port forwarding
```

</div>

<div class="block-pair-item">

```sh
apply   # Declarative apply (most important)
create  # Create once
delete  # Delete resource
edit    # Edit live object
patch   # Partial update
scale   # Scale replicas
rollout # Rollout control (deploy/sts)
```

</div>
</div>

**Generic Flags** (applied to all verbs):

```sh
-n <ns>        # Namespace
-A             # All namespaces
-o wide        # Extended columns
-o yaml        # Full YAML
-o json        # JSON output
--watch        # Watch changes
--selector     # Label selector
```

**Verb-Specific Flags**:

<div class="block-pair">
<div class="block-pair-item">

```sh
# apply
-f <file> # File to apply
--dry-run # Don't make changes
--prune   # Remove resources that no longer match
```

<br>

```sh
# exec
-c <container>
-i             # Keep stdin open
-t             # Allocate TTY
```

</div>

<div class="block-pair-item">

```sh
# create
-f <file>        # Create from file
--dry-run=client # Simulate create
--save-config    # Save config in annotation
```

<br>

```sh
# logs
-c <container> # log specific container
-f             # Follow logs
--previous     # Previous container instance
```

</div>
</div>

**Resources**:

```sh
kubectl api-resources # List all resources
```

<div class="block-pair">
<div class="block-pair-item">

```sh
# workload
pod         # po
replicaset  # rs
deployment  # deploy
statefulset # sts
daemonset   # ds
job
cronjob     # cj
```

<br>

```sh
configmap # cm
secret
```

<br>

```sh
# Namespace & RBAC
namespace      # ns
serviceaccount # sa
role
rolebinding
clusterrole
clusterrolebinding
```

<br>

```sh
# Autoscaling
horizontalpodautoscaler # hpa
```

</div>

<div class="block-pair-item">

```sh
# Service & Networking
service       # svc
endpoints     # ep
ingress
ingressclass
networkpolicy # netpol
```

<br>

```sh
# Storage
persistentvolume      # pv
persistentvolumeclaim # pvc
storageclass          # sc
volumeattachment
csidriver
csinode
```

<br>

```sh
# Node & Cluster
node            # no
event
componentstatus # cs, deprecated
```

<br>

```sh
# CR
customresourcedefinition # crd
```

</div>
</div>

# Linux Terminal

<div class="block-pair">
<div class="block-pair-item">

```sh
ctrl+a # Move cursor to beginning of line
ctrl+e # Move cursor to end of line
```

<br>

```sh
ctrl+p # Previous history entry
ctrl+n # Next history entry
ctrl+r # Reverse history search
ctrl+s # Forward history search
ctrl+g # Abort operation
```

<br>

```sh
ctrl+l  # Clear screen
ctrl+c  # Interrupt (SIGINT)
ctrl+z  # Suspend (SIGTSTP)
ctrl+_  # Undo
#ctrl+t # Transpose characters
```

</div>

<div class="block-pair-item">

```sh
ctrl+b # Backward one character
ctrl+f # Forward one character
alt+b  # Backward one word
alt+f  # Forward one word
```

<br>

```sh
ctrl+u  # Kill to beginning of line
ctrl+k  # Kill to end of line
ctrl+w  # Kill previous word
alt+d   # Kill next word
ctrl+d  # Delete char under cursor (EOF if empty line)
ctrl+h  # Delete previous char (backspace)
#ctrl+y # Yank (paste)
```

<br>

```sh
# alt+u # Uppercase word
# alt+l # Lowercase word
# alt+c # Capitalize word
# alt+. # Insert last argument of previous command
# alt+y # Rotate kill ring (after Ctrl+y)
# alt+t # Transpose words
```

</div>
</div>

# Diskpart & CMD

```sh
# in cmd
diskpart          # Enter DiskPart environment (low-level disk tool)
dir               # cmd ls
cd                # cmd pwd
cd <path>         # cmd cd
mkdir             # cmd mkdir
del               # cmd rm
rmdir /s <dir>    # cmd rm -r
copy              # cmd cp
xcopy             # cmd cp -r
move              # cmd mv
bcdboot C:\Windows /s S:
```

<div class="block-pair">
<div class="block-pair-item">

```sh
# in diskpart
list disk
list volume

select disk <disk_no>
select volume <vol_no>

exit
```

<br>

```sh
# under selected volume
detail volume        # Show volume details
format fs=ntfs quick # Format volume (same as partition)
assign letter=S      # Assign drive letter
remove letter=S      # Remove drive letter
delete volume        # Delete volume
```

</div>

<div class="block-pair-item">

```sh
# under selected disk
detail disk                   # Show details
clean                         # Clear partition table
convert gpt                   # Convert to GPT
create partition efi size=100 # EFI (fat32, 100MB)
create partition msr size=16  # MSR (microsoft-specific, no format, no mount)
create partition primary      # primary partition (ntfs)
select partition <part_no>
```

<br>

```sh
# under selected partition
detail partition      # Show partition details
format fs=fat32 quick # Format as fat32
delete partition
delete partition override # Force delete protected partition
```

</div>
</div>

# Filesystem

<table>
  <thead>
    <tr>
      <th>Filesystem</th>
      <th>Key Characteristics</th>
      <th>Typical Use Cases</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ext4</td>
      <td>
        <ul>
          <li>Journaling metadata</li>
          <li>Fixed inode table</li>
          <li>No native snapshots or checksums</li>
        </ul>
      </td>
      <td>General-purpose Linux systems, system disks</td>
    </tr>
    <tr>
      <td>XFS</td>
      <td>
        <ul>
          <li>Extent-based allocation</li>
          <li>High parallel I/O scalability</li>
          <li>Online grow only (no shrink)</li>
        </ul>
      </td>
      <td>Large files, high-throughput data volumes</td>
    </tr>
    <tr>
      <td>Btrfs</td>
      <td>
        <ul>
          <li>Copy-on-write for data and metadata</li>
          <li>Subvolumes and snapshots</li>
          <li>Checksums for data and metadata</li>
        </ul>
      </td>
      <td>Snapshot-based backups, container storage, rollback-capable systems</td>
    </tr>
    <tr>
      <td>ZFS (OpenZFS)</td>
      <td>
        <ul>
          <li>Copy-on-write transactional model</li>
          <li>End-to-end data checksumming</li>
          <li>Pooled storage with RAID-Z</li>
        </ul>
      </td>
      <td>NAS, archival storage, data integrity–critical workloads</td>
    </tr>
    <tr>
      <td>F2FS</td>
      <td>
        <ul>
          <li>Log-structured design</li>
          <li>Optimized for flash memory</li>
          <li>Reduces write amplification</li>
        </ul>
      </td>
      <td>Flash-based devices, mobile and embedded systems</td>
    </tr>
    <tr>
      <td>NTFS</td>
      <td>
        <ul>
          <li>Journaling filesystem</li>
          <li>ACL-based permissions</li>
          <li>Supports sparse files and reparse points</li>
        </ul>
      </td>
      <td>Windows system and data volumes</td>
    </tr>
    <tr>
      <td>ReFS</td>
      <td>
        <ul>
          <li>Metadata checksumming</li>
          <li>Copy-on-write for metadata</li>
          <li>No in-place repair required for some corruptions</li>
        </ul>
      </td>
      <td>Windows Server large data volumes</td>
    </tr>
    <tr>
      <td>exFAT</td>
      <td>
        <ul>
          <li>No journaling</li>
          <li>Large file and volume support</li>
          <li>Minimal metadata features</li>
        </ul>
      </td>
      <td>Removable drives, cross-platform file exchange</td>
    </tr>
    <tr>
      <td>FAT32</td>
      <td>
        <ul>
          <li>No journaling</li>
          <li>4GB maximum file size</li>
          <li>Very simple on-disk format</li>
        </ul>
      </td>
      <td>Firmware, boot partitions, legacy compatibility</td>
    </tr>
    <tr>
      <td>APFS</td>
      <td>
        <ul>
          <li>Copy-on-write metadata and data</li>
          <li>Space sharing between volumes</li>
          <li>Native encryption support</li>
        </ul>
      </td>
      <td>macOS and iOS devices</td>
    </tr>
    <tr>
      <td>SquashFS</td>
      <td>
        <ul>
          <li>Read-only filesystem</li>
          <li>Block-level compression</li>
          <li>Deterministic image layout</li>
        </ul>
      </td>
      <td>Live systems, embedded firmware, container base images</td>
    </tr>
    <tr>
      <td>EROFS</td>
      <td>
        <ul>
          <li>Read-only design</li>
          <li>Compression optimized for random reads</li>
          <li>Fixed metadata layout</li>
        </ul>
      </td>
      <td>Android system images, embedded deployments</td>
    </tr>
    <tr>
      <td>tmpfs</td>
      <td>
        <ul>
          <li>Memory-backed storage</li>
          <li>Can swap to disk</li>
          <li>Size limited by configuration</li>
        </ul>
      </td>
      <td>Temporary files, runtime caches</td>
    </tr>
    <tr>
      <td>OverlayFS</td>
      <td>
        <ul>
          <li>Upper/lower directory layering</li>
          <li>Copy-up on write</li>
          <li>Single merged namespace</li>
        </ul>
      </td>
      <td>Container filesystems, immutable root systems</td>
    </tr>
    <tr>
      <td>NFS</td>
      <td>
        <ul>
          <li>Stateless protocol (v3)</li>
          <li>POSIX-like semantics</li>
          <li>Server-side storage authority</li>
        </ul>
      </td>
      <td>Unix/Linux shared network storage</td>
    </tr>
    <tr>
      <td>SMB / CIFS</td>
      <td>
        <ul>
          <li>Stateful protocol</li>
          <li>Integrated authentication and ACLs</li>
          <li>File locking at protocol level</li>
        </ul>
      </td>
      <td>Windows file sharing, mixed-OS environments</td>
    </tr>
    <tr>
      <td>CephFS</td>
      <td>
        <ul>
          <li>Metadata servers + object storage backend</li>
          <li>Strong consistency</li>
          <li>Horizontal scaling</li>
        </ul>
      </td>
      <td>Cloud platforms, large-scale shared storage</td>
    </tr>
    <tr>
      <td>GlusterFS</td>
      <td>
        <ul>
          <li>Hash-based file distribution</li>
          <li>User-space filesystem</li>
          <li>Replication or erasure coding</li>
        </ul>
      </td>
      <td>Scale-out file services</td>
    </tr>
    <tr>
      <td>Lustre</td>
      <td>
        <ul>
          <li>Separate metadata and object storage servers</li>
          <li>Striped file layout</li>
          <li>Optimized for parallel access</li>
        </ul>
      </td>
      <td>HPC and supercomputing workloads</td>
    </tr>
    <tr>
      <td>HDFS</td>
      <td>
        <ul>
          <li>Append-only write model</li>
          <li>Large block sizes</li>
          <li>Rack-aware replication</li>
        </ul>
      </td>
      <td>Batch analytics, data lakes</td>
    </tr>
    <tr>
      <td>Object Storage (S3-like)</td>
      <td>
        <ul>
          <li>Object-level access (no POSIX semantics)</li>
          <li>Immutable object versions</li>
          <li>HTTP-based API</li>
        </ul>
      </td>
      <td>Backups, archives, static content, data lakes</td>
    </tr>
    <tr>
      <td>procfs</td>
      <td>
        <ul>
          <li>Kernel and process data exposure</li>
          <li>No persistent storage</li>
          <li>Dynamically generated files</li>
        </ul>
      </td>
      <td>System introspection and monitoring</td>
    </tr>
    <tr>
      <td>sysfs</td>
      <td>
        <ul>
          <li>Kernel object model exposure</li>
          <li>Device and driver attributes</li>
          <li>Configuration via virtual files</li>
        </ul>
      </td>
      <td>Device management and kernel tuning</td>
    </tr>
  </tbody>
</table>
