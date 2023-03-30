{ pkgs ? import <nixpkgs> { } }:

let
  env = pkgs.python310.withPackages (p: with p; [
    uvicorn
    fastapi
    pymongo
    passlib
    pyjwt
    python-decouple
    termcolor
  ]);
in

pkgs.mkShell {
  name = "taskerfy";
  buildInputs = with pkgs; [
    env
    lolcat
    tmux
    # other dependencies
  ];
  shellHook = ''
    export PYTHONPATH="./src:$PYTHONPATH"

    clear 
    echo "Welcom to $(python --version) environmet!" | lolcat
    echo "****************************************"
    echo -e "https://nixos.wiki/wiki/Python"
    echo -e "https://nixos.wiki/wiki/Development_environment_with_nix-shell"
    echo -e "https://ghedam.at/a-tour-of-nix-flakes"
    echo "*********************************************************************"
  '';
}
